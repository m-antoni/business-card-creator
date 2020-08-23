import { SET_LOADING, AUTH_SUCCESS, AUTH_ERROR, HANDLE_INPUT_ON_CHANGE, CLEAR_AUTH, SET_COUNTRY, HANDLE_SELECT_COUNTRY, SIGN_OUT_SUCCESS } from './../types';
import firebase from '../../../Services/firebase';
import { SwalSuccess, SwalError } from '../../../Utils/SweetAlert';
import countryList from 'react-select-country-list';
import { setUserSession, removeUserSession } from '../../../Utils/Common';
import { ToastQuestion } from '../../../Utils/Toast';

export const setLoading = (status) => async dispatch => dispatch({ type: SET_LOADING, payload: status });

export const handleInputOnChange = e => async dispatch => dispatch({ type: HANDLE_INPUT_ON_CHANGE, payload: { key: e.target.name, value: e.target.value } });

export const clearAuth = () => async dispatch => dispatch({ type: CLEAR_AUTH });

export const fetchCountryData = () => async dispatch => {

    const countryData = countryList().getData();

    dispatch({ type: SET_COUNTRY, payload: countryData });
    
}

export const handleSelectCountry = (selectOption) => async dispatch => {
    dispatch({ type: HANDLE_SELECT_COUNTRY, payload: selectOption });    
}

// handle sign-in
export const handleSignIn = e => async (dispatch, getState) => {
    e.preventDefault();

    const { sign_in_email, sign_in_password } = getState().auth.input_params;
    dispatch(setLoading(true));
    
    firebase.auth().signInWithEmailAndPassword(sign_in_email, sign_in_password)
        .then(() => {
    
            const setUserParam = {
                name: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                photoUrl: firebase.auth().currentUser.photoURL,
                emailVerified: firebase.auth().currentUser.emailVerified,
                uid: firebase.auth().currentUser.uid,
            }

            setUserSession(setUserParam);
            
            let base_url = window.location.origin + '/dashboard';
            return window.location.href = base_url;
        })
        .catch((err) => {
            dispatch(setLoading(false));
            dispatch(clearAuth());
            SwalError('Invalid Credentials');
            console.log(`Error: ${err}`);
        });
}

// handle sign-up
export const handleSignUp = e => async (dispatch, getState) => {
    e.preventDefault();

    const { input_params } = getState().auth;

    if(input_params.password != input_params.confirm_password)
    {
        SwalError('password and confirm password are not the same');
    }
    else
    {
        dispatch(setLoading(true));

        firebase.auth().createUserWithEmailAndPassword(input_params.email, input_params.password)
            .then((res) => {

                // create user data
                const db = firebase.firestore();
                return db.collection('users').doc(res.user.uid).set({
                    name: input_params.name,
                    age: input_params.age,
                    country: input_params.country,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
            })
            .then(() => {

                // sign-in user
                firebase.auth().signInWithEmailAndPassword(input_params.email, input_params.password)

                const setUserParam = {
                    name: firebase.auth().currentUser.displayName,
                    email: firebase.auth().currentUser.email,
                    photoUrl: firebase.auth().currentUser.photoURL,
                    emailVerified: firebase.auth().currentUser.emailVerified,
                    uid: firebase.auth().currentUser.uid,
                }
                
                setUserSession(setUserParam);
                let base_url = window.location.origin + '/dashboard';
                return window.location.href = base_url;
            })
            .catch((err) => {
                dispatch(setLoading(false));
                dispatch(clearAuth());
                // SwalError('Something went wrong... ');
                SwalError(err);
                console.log(`Error: ${err}`);
            })
    }

}

// handle sign-out
export const handleSignOut = () => async dispatch => {
    dispatch(setLoading(true));
    firebase.auth().signOut().then(() => {
        console.log('Sign Out Success')
        removeUserSession();    
        window.location.reload();
    });
}


export const  sendToEmailPassword = () => async dispatch => {
    
}

