import { SET_LOADING, HANDLE_SETUP_QUIZ_INPUT, CLEAR_SETUP_QUIZ, SET_MODAL, GET_TRIVIA_CREDENTIALS, HANDLE_SETUP_QUIZ_SELECT, SET_QUESTIONS_DATA } from '../actions/types';

// state
const initialState = {
    params: {
        amount: { value: '', label: 'Choose Number of Questions' },
        category: { value: '', label: 'Choose Category' },
        difficulty: { value: '', label: 'Choose Difficulty' },
        type: { value: '', label: 'Choose Type' },
    },
    questions_data: [],
    trivia_categories: [],
    trivia_amounts: [
        { value: 5, label: 5, name: 'amount' },
        { value: 10, label: 10, name: 'amount' },
        { value: 20, label: 20, name: 'amount' },
        { value: 30, label: 30, name: 'amount' },
        { value: 40, label: 40, name: 'amount' },
        { value: 50, label: 50, name: 'amount' },
    ],
    trivia_difficulties: [
        { value: 'any', label: 'Any Difficulty', name: 'difficulty'},
        { value: 'easy', label: 'Easy', name: 'difficulty' },
        { value: 'medium', label: 'Medium', name: 'difficulty' },
        { value: 'hard', label: 'Hard', name: 'difficulty' },
    ],
    trivia_types: [
        { value: 'any', label: 'Any Type', name: 'type'},
        { value: 'multiple', label: 'Multiple Choice', name: 'type' },
        { value: 'boolean', label: 'True or False', name: 'type' },
    ],
    loading: false,
    setup_quiz_modal: false
}

const setupQuizReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case HANDLE_SETUP_QUIZ_INPUT:
            return {
                ...state,
                params: { ...state.params, [action.payload.key]: action.payload.value }
            }
        case HANDLE_SETUP_QUIZ_SELECT:
            return {
                ...state,
                params: { ...state.params, [action.payload.key]: action.payload.value }
            }
        case GET_TRIVIA_CREDENTIALS:
            return {
                ...state,
                ...action.payload
            }
        case SET_QUESTIONS_DATA:
            return {
                ...state,
                questions_data: action.payload
            }
        case SET_MODAL:
            return {
                ...state,
                [action.payload.modal]: action.payload.status
            }
        case CLEAR_SETUP_QUIZ:
            return {
                ...state,
                params: {
                    amount: { value: '', label: 'Choose Number of Questions' },
                    category: { value: '', label: 'Choose Category' },
                    difficulty: { value: '', label: 'Choose Difficulty' },
                    type: { value: '', label: 'Choose Type' },
                },
                setup_quiz_modal: false
            }
        default:
            return state;
    }
}

export default setupQuizReducer;