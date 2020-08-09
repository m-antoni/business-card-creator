import { SET_LOADING, HANDLE_SETUP_QUIZ_INPUT, CLEAR_SETUP_QUIZ, SET_MODAL, FETCH_TRIVIA_CREDENTIALS, HANDLE_SETUP_QUIZ_SELECT, SET_QUESTIONS_DATA } from '../actions/types';

// state
const initialState = {
    params: {
        amount: '',
        category: { value: '', label: 'Choose Category' },
        difficulty: { value: '', label: 'Choose Difficulty' },
        type: { value: '', label: 'Choose Type' },
    },
    questions_data: [],
    trivia_categories: [],
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
        case FETCH_TRIVIA_CREDENTIALS:
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
                    amount: '',
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