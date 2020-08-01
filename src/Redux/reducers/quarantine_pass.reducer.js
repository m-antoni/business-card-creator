import { SET_LOADING, QUARANTINE_PASS_INPUT, DOWNLOAD_PASS, CLEAR_QUARANTINE_PASS } from '../types';

// state
const initialState = {
    quarantine_pass_params: [],
    tarvel_pass: [],
    loading: false
}

// reducer
const quarantinePassReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case QUARANTINE_PASS_INPUT: 
            return {
                ...state,
                quarantine_pass_params: { ...state.quarantine_pass_params, [action.payload.key]: action.payload.value }
            }
        case CLEAR_QUARANTINE_PASS:
            return {
                ...state,
                quarantine_pass_params: [],
            }
        default:
            return state;
    }
}

export default quarantinePassReducer;