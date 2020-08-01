import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// All reducers
import authReducer from './auth.reducer';
import quarantinePassReducer from './quarantine_pass.reducer';

// persist config 
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'] // you want to persist in localstorage
}

// combining all reducers
const rootReducer = combineReducers({
    auth: authReducer,
    quarantine_pass: quarantinePassReducer
});

export default persistReducer(persistConfig, rootReducer);