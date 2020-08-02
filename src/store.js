import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './Redux/reducers/_index';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import logger from 'redux-logger'
import firebase from './Services/firebase';

const middleware = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export const persistor = persistStore(store);

export default { store, persistor};