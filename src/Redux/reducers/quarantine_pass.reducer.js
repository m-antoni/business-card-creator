import { SET_LOADING } from '../actions/types';

// state
const initialState = {
    quarantine_pass_params: [],
    loading: false
}

// reducer
const quarantinePassReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default quarantinePassReducer;