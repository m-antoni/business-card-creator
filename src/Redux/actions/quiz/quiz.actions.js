import * as TYPE from '../types';
import firebase from '../../../Services/firebase';
import $ from 'jquery';
import { randomArrayShuffle, setQuestionsToLocalStorage, setTriviaTokenToLocalStorage, getTriviaTokenFromLocalStorage, getCurrentQuestionFromLocalStorage, getQuestionIndex, setAnotherQuestionToLocalStorage, getQuestionsFromLocalStorage, setScore, getScore, getUID } from '../../../Utils/Common';
import { ToastDanger, ToastSuccess } from '../../../Utils/Toast';
import { SwalSuccess } from '../../../Utils/SweetAlert';
import { TriviaAPIService } from './_api.quiz';
import Swal from 'sweetalert2';

// set loading
export const setLoading = (status) => async dispatch => dispatch({ type: TYPE.SET_LOADING, payload: status });

// handle input
export const handleInputOnChange = e => async dispatch => dispatch({ type: TYPE.HANDLE_SETUP_QUIZ_INPUT, payload: { key: e.target.name, value: e.target.value } });

// clear fields
export const clearSetupQuiz = () => async dispatch => dispatch({ type: TYPE.CLEAR_SETUP_QUIZ });

// set modal
export const setModal = (modal, status = true) => async dispatch => {

    if(status)
    {
        dispatch({ type: TYPE.SET_MODAL, payload: { modal, status } });   
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

    dispatch({ type: TYPE.HANDLE_SETUP_QUIZ_SELECT, payload: selected_param });
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
           dispatch({ type: TYPE.GET_TRIVIA_CREDENTIALS, payload: { trivia_categories: createSelectOption(res.data.trivia_categories) } });
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
    dispatch({ type: TYPE.SET_QUESTIONS_DATA, payload: questions });
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
    let questions_data = getQuestionsFromLocalStorage();
    let current_question = getCurrentQuestionFromLocalStorage();
    let question_index = getQuestionIndex();
    let score = getScore();

    try {

        if(questions_data.length == question_index)
        {
           dispatch(saveQuizData())
        }

        let params = {
            current_question: current_question,
            correct_answer: current_question ? current_question.correct_answer : [], 
            question_index: question_index, 
            questions_data: questions_data,
            score: score,
        }
        
        dispatch({ type: TYPE.GET_CURRENT_QUESTION,payload: params });

    } catch (err) {
        console.log(`Error: ${err}`);
        ToastDanger('')
    }
}

// handle on change answer
export const handleOnChangeRadio = e => async dispatch => {
    // console.log(e.target.value);
    dispatch({ type: TYPE.HANDLE_ONCHANGE_RADIO, payload: e.target.value });
} 

// handle submit answer
export const handleSubmitAnswer = () => async (dispatch, getState) => {

    let { correct_answer, question_index, chosen_answer} = getState().quiz;

    try {
        
        if(chosen_answer == '') return ToastDanger('Please Choose your Answer.');

        if(correct_answer == chosen_answer)
        {
            setScore(getScore() + 1);
        }
        
        setAnotherQuestionToLocalStorage(question_index + 1);
        dispatch(getCurrentQuestion());
    } catch (err) {
        console.log(`Error: ${err}`)
    }

    $('input[name="radio-answer"]').prop('checked', false);
}

// store the data to firestore
export const saveQuizData = () => async (dispatch, getState) => {
    
    let { score } = getState().quiz;
    let uid = getUID();

    const db = firebase.firestore();

    return db.collection('quizzes').add({
        uid: uid,
        score: score,
        created_at: new Date(),
        updated_at: new Date()
    })
    .then(res => {

        try {

            const docRef = db.collection('quizzes').doc(res.id);

            docRef.get().then(doc => {

                let score = doc.data().score
                if(score == 0)
                {
                    ToastSuccess(`Sorry you only got Score ${score}`)
                }
                else
                {
                    // ToastSuccess(`Congratulations your Score: ${score}`);
                    SwalSuccess(`Congratulations your score: ${score}`)
                }
            })
    
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }).catch((err) => {
        console.log(`Error: ${err}`);
        ToastDanger('Something went wrong...');
    })
    
}


// fetch all the quiz score
export const getAllQuiz = () => async dispatch => {
    
    const db = firebase.firestore();

    db.collection('quizzes').orderBy('created_at', 'desc').limit(4).get()
    .then(snapshot => {
        let quiz_results = [];
        snapshot.docs.map(doc => quiz_results.push(doc.data()));
        
        dispatch({ type: TYPE.GET_QUIZ_RESULTS, payload: quiz_results });
    })
    .catch(err => {
        console.log(`Error: ${err}`);
        ToastDanger('Something went wrong...');
    })
    
}