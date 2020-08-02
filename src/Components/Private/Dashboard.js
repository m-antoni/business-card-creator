import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleSignOut } from '../../Redux/actions/auth/auth.actions'
import firebase from './../../Services/firebase';

function Dashboard({ handleSignOut }) {
    
    firebase.auth().onAuthStateChanged((user) => {
        if(user)
        {
            // console.log(user)
            console.log(firebase.auth().currentUser.uid)

        }
        else
        {
            // console.log(user)
            console.log(firebase.auth().currentUser.uid)
        }
    })

    return (
        <div>
            <h4>Welcome To Dasboard</h4>
            <button onClick={() => handleSignOut()}>Signout</button>
        </div>
    )
}

const mapStateToProps = state => ({
    //
})

export default connect(mapStateToProps, { handleSignOut })(Dashboard)
