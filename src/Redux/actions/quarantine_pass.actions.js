import { QUARANTINE_PASS_INPUT, SET_LOADING, DOWNLOAD_PASS, CLEAR_QUARANTINE_PASS } from '../types';
import firebase from './../../Services/firebase';
import { SwalSuccess } from '../../Utils/SweetAlert';
import { displayName } from 'qrcode.react';

export const setLoading = (status) => async dispatch => dispatch({ type: SET_LOADING, payload: status });

export const handleInputOnChange = e => async dispatch => dispatch({ type: QUARANTINE_PASS_INPUT, payload: { key: e.target.name, value: e.target.value } });

export const clearQuarantinePass = () => async dispatch => dispatch({ type: CLEAR_QUARANTINE_PASS });

export const handleSubmit = e => async (dispatch, getState) => {
    
    dispatch(setLoading(true));

    let { quarantine_pass_params } = getState().quarantine_pass;

    firebase.firestore().collection('quarantine_passes').add(quarantine_pass_params)
    .then(() => {
        dispatch(setLoading(false));
        SwalSuccess('Data has been saved');
    });
    
}