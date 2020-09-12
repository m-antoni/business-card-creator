import * as TYPE from '../actions/types';

const initialState = {
    params: {
        amount: { value: 10, label: 'Choose Number of Questions' },
        category: { value: '', label: 'Choose Category' },
        difficulty: { value: '', label: 'Choose Difficulty' },
        type: { value: 'multiple', label: 'Choose Type' },
    },
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
    trivia_categories: [],
    quiz_results: [],
    questions_data: [],
    current_question: [],
    question_index: 0,
    questions_total: 0,
    correct_answer: '',
    start: false,
    score: 0,
    loading: false,
    setup_quiz_modal: false,
    counter: 10,
    timeout: false
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case TYPE.HANDLE_SETUP_QUIZ_INPUT:
            return {
                ...state,
                params: { ...state.params, [action.payload.key]: action.payload.value }
            }
        case TYPE.HANDLE_SETUP_QUIZ_SELECT:
            return {
                ...state,
                params: { ...state.params, [action.payload.key]: action.payload.value }
            }
        case TYPE.GET_TRIVIA_CREDENTIALS:
            return {
                ...state,
                ...action.payload
            }
        case TYPE.SET_QUESTIONS_DATA:
            return {
                ...state,
                questions_data: action.payload
            }
        case TYPE.GET_CURRENT_QUESTION:
            return {
                ...state,
                questions_data: action.payload.questions_data,
                current_question: action.payload.current_question,
                correct_answer: action.payload.correct_answer,
                question_index: action.payload.question_index,
                score: action.payload.score,
                timeout: false
            }
        case TYPE.GET_QUIZ_RESULTS:
            return {
                ...state,
                quiz_results: action.payload
            }
        case TYPE.SET_MODAL:
            return {
                ...state,
                [action.payload.modal]: action.payload.status
            }
        case TYPE.SET_COUNTER:
            return {
                ...state,
                counter: action.payload
            }
        case TYPE.CLEAR_SETUP_QUIZ:
            return {
                ...state,
                params: {
                    amount: { value: 10, label: 'Choose Number of Questions' },
                    category: { value: '', label: 'Choose Category' },
                    difficulty: { value: '', label: 'Choose Difficulty' },
                    type: { value: 'multiple', label: 'Choose Type' },
                },
                setup_quiz_modal: false
            }
        default:
            return state;
    }
}

export default quizReducer;