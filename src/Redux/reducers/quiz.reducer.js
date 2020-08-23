import { SET_LOADING, HANDLE_SETUP_QUIZ_INPUT, CLEAR_SETUP_QUIZ, SET_MODAL, 
    GET_TRIVIA_CREDENTIALS,  HANDLE_SETUP_QUIZ_SELECT, SET_QUESTIONS_DATA, 
    GET_CURRENT_QUESTION, HANDLE_ONCHANGE_RADIO, GET_QUIZ_RESULTS } from '../actions/types';


const initialState = {
    params: {
        amount: { value: 10, label: 'Choose Number of Questions' },
        category: { value: '', label: 'Choose Category' },
        difficulty: { value: '', label: 'Choose Difficulty' },
        type: { value: 'multiple', label: 'Choose Type' },
    },
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
    quiz_results: [],
    questions_data: [],
    current_question: [],
    question_index: 0,
    questions_total: 0,
    correct_answer: '',
    chosen_answer: '', 
    start: false,
    score: 0,
    loading: false,
    setup_quiz_modal: false,
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
        case GET_CURRENT_QUESTION:
            return {
                ...state,
                questions_data: action.payload.questions_data,
                current_question: action.payload.current_question,
                correct_answer: action.payload.correct_answer,
                question_index: action.payload.question_index,
                score: action.payload.score,
                chosen_answer: ''
            }
        case HANDLE_ONCHANGE_RADIO:
            return {
                ...state,
                chosen_answer: action.payload
            }
        case GET_QUIZ_RESULTS:
            return {
                ...state,
                quiz_results: action.payload
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

export default quizReducer;