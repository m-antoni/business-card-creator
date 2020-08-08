import { SET_LOADING, HANDLE_SETUP_QUIZ_INPUT, SET_MODAL, CLEAR_SETUP_QUIZ, FETCH_TRIVIA_CREDENTIALS, HANDLE_SETUP_QUIZ_SELECT } from '../types';
import firebase from '../../../Services/firebase';
import { SwalSuccess, SwalError } from '../../../Utils/SweetAlert';
import countryList from 'react-select-country-list';
import { setUserSession, removeUserSession } from '../../../Utils/Common';
import { ToastQuestion, ToastDanger } from '../../../Utils/Toast';
import { TriviaAPIService } from './_api.quiz';
import { Toast } from 'react-bootstrap';

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

    let selected_param = { [selectOption.name]: selectOption.value };

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

// handle fetch questions 
export const fetchQuestions = e => async (dispatch, getState) => {
    e.preventDefault();

    let { amount, category, difficulty, type } = getState().quiz.setup_params;
    let url_param = '';

    try {

        if(amount == undefined || category == undefined || difficulty == undefined || type == undefined)
        {
            ToastDanger('Please fill in all the fields.');
        }

        if(amount > 50 || amount == 0)
        {
            Toast('Number of Questions should not be greater than 50');
        }
        
    } catch (error) {
        ToastDanger(error)
    }


    if(amount != 'any')
    {
        url_param += `amount=${amount}&`;
    }

    if(category != 'any')
    {
        url_param += `category=${category}&`;
    }

    if(difficulty != 'any')
    {
        url_param += `difficulty=${difficulty}&`;
    }

    if(type != 'any')
    {
        url_param +=`type=${type}`
    }

    if(url_param.charAt(url_param.length -1) == '&')
    {
        let removeLastChar = url_param.substr(0, url_param.length - 1);
        url_param = removeLastChar;
    }
    
    console.log(url_param)


    
}

