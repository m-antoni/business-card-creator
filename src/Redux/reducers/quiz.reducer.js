import { SET_LOADING, HANDLE_SETUP_QUIZ_INPUT, CLEAR_SETUP_QUIZ, SET_MODAL, FETCH_TRIVIA_CREDENTIALS, HANDLE_SETUP_QUIZ_SELECT } from './../actions/types';

// state
const initialState = {
    setup_params: [],
    open_trivia: {
        trivia_categories: [],
        difficulties: [
            { value: 'any', label: 'Any Difficulty', name: 'difficulty'},
            { value: 'easy', label: 'Easy', name: 'difficulty' },
            { value: 'medium', label: 'Medium', name: 'difficulty' },
            { value: 'hard', label: 'Hard', name: 'difficulty' },
        ],
        types: [
            { value: 'any', label: 'Any Type', name: 'type'},
            { value: 'multiple', label: 'Multiple Choice', name: 'type' },
            { value: 'boolean', label: 'True or False', name: 'type' },
        ],
        categories_default_value: { value: '', label: 'Choose Category' },
        difficulties_default_value: { value: '', label: 'Choose Difficulty' },
        types_default_value: { value: '', label: 'Choose Type' },
    },
    loading: false,
    setup_quiz_modal: false
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case HANDLE_SETUP_QUIZ_INPUT:
            return {
                ...state,
                setup_params: { ...state.setup_params, [action.payload.key]: action.payload.value }
            }
        case HANDLE_SETUP_QUIZ_SELECT:
            return {
                ...state,
                setup_params: { ...state.setup_params, ...action.payload }
            }
        case FETCH_TRIVIA_CREDENTIALS:
            return {
                ...state,
                open_trivia: { ...state.open_trivia, ...action.payload }
            }
        case SET_MODAL: 
            return {
                ...state,
                [action.payload.modal]: action.payload.status
            }
        case CLEAR_SETUP_QUIZ:
            return {
                ...state,
                setup_params: [],
                setup_quiz_modal: false
            }
        default:
            return state;
    }
}

export default quizReducer;