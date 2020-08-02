import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../../Services/firebase';
import { MiniSpinner } from '../../Layouts/Spinner';
import Select from 'react-select'
import { handleInputOnChange, handleSignUp, handleSelectCountry, fetchCountryData , clearAuth} from '../../Redux/actions/auth/auth.actions';

function SignUp({ auth: { loading, country_data }, handleInputOnChange, handleSelectCountry, fetchCountryData, clearAuth }) {

    useEffect(() => {
        fetchCountryData();
        clearAuth();
    
    },[])

    return (
        <div className="container">
            <div className="row">
               <div className="mx-auto col-md-5">
                    <div className="my-5 card card-body">
                        <h4 classNam="text-center">Sign Up</h4> <hr/>
                        {
                            loading ? <div className="my-5"><MiniSpinner/></div>
                            :
                            <form>
                                <div className="form-group">
                                    <label htmlFor="">Full Name:</label>
                                    <input onChange={handleInputOnChange} type="text" name="name" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Age:</label>
                                    <input onChange={handleInputOnChange} type="number" name="age" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Street Address:</label>
                                    <textarea onChange={handleInputOnChange} type="text" name="street" className="form-control" rows="2"></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">City:</label>
                                    <Select options={country_data} name="country" onChange={handleSelectCountry}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Phone Number:</label>
                                    <input onChange={handleInputOnChange} type="number" name="phone" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Email:</label>
                                    <input onChange={handleInputOnChange} type="text" name="email" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Password:</label>
                                    <input onChange={handleInputOnChange} type="password" name="password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Confirm Password:</label>
                                    <input onChange={handleInputOnChange} type="confirm_password" name="confirm_password" className="form-control"/>
                                </div>
                                <div className="form-group mt-4">
                                    <button onClick={SignUp} type="button" class="btn btn-dark btn-block">Sign Up</button>
                                    <a href="/" class="btn btn-danger btn-block">Go back</a>
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

export default connect(mapStateProps, { handleInputOnChange, handleSignUp, handleSelectCountry, fetchCountryData, clearAuth })(SignUp)
