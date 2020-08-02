import { SET_LOADING, AUTH_ERROR, AUTH_SUCCESS, HANDLE_INPUT_ON_CHANGE, SET_COUNTRY, HANDLE_SELECT_COUNTRY, CLEAR_AUTH  } from './../actions/types';

// state
const initialState = {
    input_params: [],
    user_data: [],
    loading: false,
    country_data: [],
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_COUNTRY:
            return {
                ...state,
                country_data: action.payload
            }    
        case HANDLE_SELECT_COUNTRY:
            return {
                ...state,
                input_params: { ...state.input_params, country: action.payload }
            }
        case HANDLE_INPUT_ON_CHANGE: {
            return {
                ...state,
                input_params: { ...state.input_params, [action.payload.key]: action.payload.value }
            }
        }
        case CLEAR_AUTH:
            return {
                ...state,
                input_params: [],
                loading: false,
            }
        default:
            return state;
            break;
    }
}

export default authReducer;