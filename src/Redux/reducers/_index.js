import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import firebase from './../../Services/firebase';

// All reducers
import authReducer from './auth.reducer';
import setupQuizReducer from './setup_quiz.reducer';
import questionsReducer from './questions.reducer';
// persist config 
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [] // you want to persist in localstorage
}

// combining all reducers
const rootReducer = combineReducers({
    auth: authReducer,
    setup_quiz: setupQuizReducer,
    questions: questionsReducer
});

export default persistReducer(persistConfig, rootReducer);