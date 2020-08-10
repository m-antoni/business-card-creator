import { SET_LOADING } from './../actions/types';

const initialState = {
    questions_data: [],
    score: 0,
    accepting_answers: false,
    question_counter: 0,
    available_questions: [],
    max_questions: 0,
    loading: false
}

const questionsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}


export default questionsReducer;