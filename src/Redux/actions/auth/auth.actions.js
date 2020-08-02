import { SET_LOADING, AUTH_SUCCESS, AUTH_ERROR, HANDLE_INPUT_ON_CHANGE, CLEAR_AUTH, SET_COUNTRY, HANDLE_SELECT_COUNTRY, SIGN_OUT_SUCCESS } from './../types';
import firebase from '../../../Services/firebase';
import { SwalSuccess, SwalError } from '../../../Utils/SweetAlert';
import countryList from 'react-select-country-list';
import { setUserSession, removeUserSession } from '../../../Utils/Common';

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


export const handleSignUp = e => async (dispatch, getState) => {
    e.preventDefault();
    // dispatch(setLoading(true));

    // let { quarantine_pass_params } = getState().quarantine_pass;

    // firebase.firestore().collection('quarantine_passes').add({
    //     ...quarantine_pass_params,
    //     created_at: new Date()
    // })
    // .then(() => {
    //     dispatch(setLoading(false));
    //     dispatch(clearQuarantinePass());
    //     SwalSuccess('Data has been saved');
    // })
    // .catch((error) => {
    //     SwalError('Something went wrong.');
    //     console.log(error);
    // })
    
}


export const handleSignIn = e => async (dispatch, getState) => {
    e.preventDefault();

    const { sign_in_email, sign_in_password } = getState().auth.input_params;

    dispatch(setLoading(true));
    firebase.auth().signInWithEmailAndPassword(sign_in_email, sign_in_password)
        .then(() => {
            dispatch(setLoading(false));

            dispatch({ type: AUTH_SUCCESS });
    
            const setUserParam = {
                // name: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                photoUrl: firebase.auth().currentUser.photoURL,
                emailVerified: firebase.auth().currentUser.emailVerified,
                uid: firebase.auth().currentUser.uid,
            }
            setUserSession(setUserParam);
            window.location.reload();
        })
        .catch((err) => {
            dispatch(setLoading(false));
            dispatch(clearAuth());
            SwalError('Invalid Credentials');
            console.log(`Error: ${err}`);
        });
}


export const handleSignOut = () => async dispatch => {
    
    firebase.auth().signOut().then(() => {
        console.log('Sign Out Success')
        dispatch({ type: SIGN_OUT_SUCCESS })
        removeUserSession();
        window.location.reload();
    });
}

export const  sendToEmailPassword = () => async dispatch => {
    
}

