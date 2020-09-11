import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MiniSpinner } from '../../Layouts/Spinner';
import { handleInputOnChange, handleSignIn } from '../../Redux/actions/auth/auth.actions';
import firebase from '../../Services/firebase';
import { withRouter } from 'react-router-dom';

function SignIn({ auth: { loading }, handleInputOnChange, handleSignIn }) {
    
    return (
        <div className="container">
            <div className="row">
               <div className="mx-auto col-md-5">
                    <div className="my-5 card card-body">
                        <div className="text-center"><i className="fa fa-user-circle fa-5x text-primary"></i></div><hr/>
                        {
                            loading ? <div className="my-5"><MiniSpinner/></div>
                            :
                            <form onSubmit={handleSignIn}>
                                <div className="form-group">
                                    <label htmlFor="">Email:</label>
                                    <input onChange={handleInputOnChange} type="email" name="sign_in_email" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Password:</label>
                                    <input onChange={handleInputOnChange} type="password" name="sign_in_password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <a href="/forgot-password" className="text-danger">Forgot Password ?</a>
                                </div>
                                <div className="form-group mt-4">
                                    <button type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
                                    <div>Don't have an account? <a href="/signup" class="">Go Sign up</a></div>
                                </div>
                            </form>
                        }
                    </div>  
               </div>
            </div>
        </div>
    )
}

const mapStateProps = state => ({
    auth: state.auth
})

export default connect(mapStateProps, { handleInputOnChange, handleSignIn })(withRouter(SignIn))
