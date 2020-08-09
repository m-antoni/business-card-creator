import { SET_LOADING, HANDLE_SETUP_QUIZ_INPUT, SET_MODAL, CLEAR_SETUP_QUIZ, FETCH_TRIVIA_CREDENTIALS, HANDLE_SETUP_QUIZ_SELECT, SET_QUESTIONS_DATA } from '../types';
import firebase from '../../../Services/firebase';
import { randomArrayShuffle, setQuestionsToLocalStorage, setTriviaAPIToken, getTriviaAPIToken } from '../../../Utils/Common';
import { ToastDanger } from '../../../Utils/Toast';
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
export const fetchCategories = () => async dispatch => {
    TriviaAPIService.fetchCategories().then(res => {
       if(res.status == 200)
       {
           dispatch({ type: FETCH_TRIVIA_CREDENTIALS, payload: { trivia_categories: createSelectOption(res.data.trivia_categories) } });
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
export const fetchTriviaAPIToken = () => async dispatch => {

    if(!getTriviaAPIToken())
    {
        TriviaAPIService.fetchTriviaAPIToken().then(res => {
            if(res.data.response_code == 0)
            {
                setTriviaAPIToken(res.data.token);
                console.log(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            ToastDanger('Something went wrong...');
        })
    }
}

export const resetTriviaAPIToken = () => async dispatch => {
    
    TriviaAPIService.resetTriviaAPIToken().then(res => {
        if(res.data.response_code == 0)
        {
            setTriviaAPIToken(res.data.token);
            console.log('Token has been reset')
        }
    })
    .catch(err => {
        console.log(err);
        ToastDanger('Something went wrong...');
    })

}

// handle fetch questions 
export const fetchQuestions = e => async (dispatch, getState) => {
    e.preventDefault();

    let { params } = getState().setup_quiz;

    try {

        let url_param = '';

        if(params.amount == '' || params.category == '' || params.difficulty == '' || params.type == '')
        {
            ToastDanger('Please fill in all the fields.');
        }
        else
        {
            // loop through params and format the url params
            Object.keys(params).map(key => {
                key == 'amount' ? url_param += (url_param = `${key}=${params[key]}&`) : params[key].value != 'any' && (url_param += `${key}=${params[key].value}&`);
            })

            // remove & at the end of string
            // if(url_param.charAt(url_param.length -1) == '&')
            // {
            //     let removeLastChar = url_param.substr(0, url_param.length - 1);
            //     url_param = removeLastChar;
            // }

            // add token
            url_param += `token=${getTriviaAPIToken()}`;

            dispatch(setLoading(true))
            TriviaAPIService.fetchQuestions(url_param).then(res => {
                switch (res.data.response_code) {
                    case 1:
                        ToastDanger('The API doesn\'t have enough questions for your query')
                    case 2:
                        ToastDanger('You place an invalid field, please check your field')
                        break;
                    case 3:
                        console.log(res.data.response_code)
                    case 0:
                        setQuestionsToLocalStorage(res.data.results);
                        dispatch(clearSetupQuiz());
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
        }

    } catch (err) {
        ToastDanger('Something went wrong...');
        dispatch(setLoading(false))
        console.log(err)
    }
}
