import { SET_LOADING, HANDLE_SETUP_QUIZ_INPUT, SET_MODAL, CLEAR_SETUP_QUIZ, GET_TRIVIA_CREDENTIALS, HANDLE_SETUP_QUIZ_SELECT, SET_QUESTIONS_DATA, GET_CURRENT_QUESTION, HANDLE_ONCHANGE_RADIO, INCREMENT_SCORE } from '../types';
import firebase from '../../../Services/firebase';
import { randomArrayShuffle, setQuestionsToLocalStorage, setTriviaTokenToLocalStorage, getTriviaTokenFromLocalStorage, getQuizStart, getCurrentQuestionFromLocalStorage, getQuestionIndex, setAnotherQuestionToLocalStorage, getQuestionsFromLocalStorage } from '../../../Utils/Common';
import { ToastDanger } from '../../../Utils/Toast';
import { SwalSuccess } from '../../../Utils/SweetAlert';
import { TriviaAPIService } from './_api.quiz';


// set loading
export const setLoading = (status) => async dispatch => dispatch({ type: SET_LOADING, payload: status });

// handle input
export const handleInputOnChange = e => async dispatch => dispatch({ type: HANDLE_SETUP_QUIZ_INPUT, payload: { key: e.target.name, value: e.target.value } });

// clear fields
export const clearSetupQuiz = () => async dispatch => dispatch({ type: CLEAR_SETUP_QUIZ });

// set modal
export const setModal = (modal, status = true) => async dispatch => {

    if(status)
    {
        dispatch({ type: SET_MODAL, payload: { modal, status } });   
    }
    else
    {
        // clear all the states and modals
        dispatch(clearSetupQuiz()); 
    }
}

// handle select 
export const handleSelectTrivia = (selectOption) => async dispatch => {

    let selected_param = { key: [selectOption.name], value: { value: selectOption.value, label: selectOption.label } };

    dispatch({ type: HANDLE_SETUP_QUIZ_SELECT, payload: selected_param });
}


// create selectOptions
const createSelectOption = (lists, api_type = '') => {
    
    let selectOption = [];

    lists.map((list, i) => {
        let select = { value: list.id, label: list.name, name: 'category' }
        selectOption[i] = select;
    })

    selectOption.unshift({ value: 'any', label: 'Any Category', name: 'category' });

    return selectOption;
}

// fetch all category
export const getCategories = () => async dispatch => {
    TriviaAPIService.getCategories().then(res => {
       if(res.status == 200)
       {
           dispatch({ type: GET_TRIVIA_CREDENTIALS, payload: { trivia_categories: createSelectOption(res.data.trivia_categories) } });
       }
    })
    .catch(err => {
        console.log(err);
        ToastDanger('Something went wrong...');
    })
}

// set questions
export const setQuestionsData = questions => async dispatch => {
    setQuestionsToLocalStorage(questions);
    dispatch({ type: SET_QUESTIONS_DATA, payload: questions });
}

// fetch token
export const getTriviaAPIToken = () => async dispatch => {

    if(!getTriviaTokenFromLocalStorage())
    {
        TriviaAPIService.getTriviaAPIToken().then(res => {
            if(res.data.response_code == 0)
            {
                setTriviaTokenToLocalStorage(res.data.token);
                console.log(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            ToastDanger('Something went wrong...');
        })
    }
}

export const resetTriviaTokenToLocalStorage = () => async dispatch => {
    
    TriviaAPIService.resetTriviaAPIToken().then(res => {
        if(res.data.response_code == 0)
        {
            setTriviaTokenToLocalStorage(res.data.token);
            console.log('Token has been reset')
        }
    })
    .catch(err => {
        console.log(err);
        ToastDanger('Something went wrong...');
    })

}

// handle fetch questions 
export const getQuestions = e => async (dispatch, getState) => {
    e.preventDefault();

    let { params } = getState().quiz;

    try {

        let url_param = '';

        // format url param
        Object.keys(params).map(key => {
            params[key].value != 'any' && (url_param += `${key}=${params[key].value}&`);
        })

        // remove & at the end of string
        if(url_param.charAt(url_param.length -1) == '&')
        {
            let removeLastChar = url_param.substr(0, url_param.length - 1);
            url_param = removeLastChar;
        }

        // add token
        // url_param += `token=${getTriviaTokenFromLocalStorage()}`;

        console.log(url_param)
        dispatch(setLoading(true))
        TriviaAPIService.getQuestions(url_param).then(res => {
            switch (res.data.response_code) {
                case 1:
                    ToastDanger('The API doesn\'t have enough questions for your query')
                case 2:
                    ToastDanger('You place an invalid field, please check your field')
                    break;
                case 3:
                    console.log(res.data.response_code)
                case 4:
                    console.log(res.data.response_code)
                case 0:
                    setQuestionsToLocalStorage(res.data.results);
                    dispatch(clearSetupQuiz());
                    window.location.href = '/dashboard/quiz-view';
                default:
                    break;
            }
            dispatch(setLoading(false))
        })
        .catch(err => {
            dispatch(setLoading(false))
            ToastDanger('Something went wrong...');
            console.log(err);
        })

    } catch (err) {
        ToastDanger('Something went wrong...');
        dispatch(setLoading(false))
        console.log(err)
    }
}

// get the quiz start
export const getCurrentQuestion = () => async dispatch => {
    let start = getQuizStart();
    let questions_data = getQuestionsFromLocalStorage();
    let current_question = getCurrentQuestionFromLocalStorage();
    let question_index = getQuestionIndex();

    console.log(questions_data.length)

    dispatch({ type: GET_CURRENT_QUESTION, payload: { start: start, current_question: current_question, correct_answer: current_question.correct_answer, question_index: question_index, questions_data: questions_data } })
}

// handle on change answer
export const handleOnChangeRadio = e => async dispatch => {
    // console.log(e.target.value);
    dispatch({ type: HANDLE_ONCHANGE_RADIO, payload: e.target.value });
} 

// handle submit answer
export const handleSubmitAnswer = () => async (dispatch, getState) => {

    let { correct_answer, question_index, chosen_answer, questions_data, score} = getState().quiz;

    if(correct_answer == chosen_answer)
    {
        dispatch({ type: INCREMENT_SCORE });
    }

    if(questions_data.length == question_index)
    {
        SwalSuccess(`Congratulation You've Finished the questions, Total Score: ${score}`)
    }
    else
    {
        setAnotherQuestionToLocalStorage(question_index + 1);
        dispatch(getCurrentQuestion());
    }
    
}
