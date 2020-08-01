import React from 'react';
import { connect } from 'react-redux';
import firebase from '../../Services/firebase';
import { MiniSpinner } from '../../Layouts/Spinner';
import { handleInputOnChange, handleSubmit } from '../../Redux/actions/quarantine_pass.actions';

function QuaratinePass({ quarantine_pass: { loading }, handleInputOnChange, handleSubmit }) {

    return (
        <div className="container">
            <div className="row">
               <div className="mx-auto col-md-5">
                    <div className="quarantine-pass card card-body">
                        <h4 classNam="text-center">Quarantine Pass</h4> <hr/>
                        {
                            loading ? <MiniSpinner/>
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
                                    <label htmlFor="">Address:</label>
                                    <textarea onChange={handleInputOnChange} type="text" name="address" className="form-control" rows="3"></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Phone Number:</label>
                                    <input onChange={handleInputOnChange} type="number" name="phone" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Email:</label>
                                    <input onChange={handleInputOnChange} type="text" name="email" className="form-control"/>
                                </div>
                                <div className="form-group mt-4">
                                    <button onClick={handleSubmit} type="button" class="btn btn-primary btn-block">Generate Pass</button>
                                    <a href="/generate" class="btn btn-danger btn-block">Cancel</a>
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
    quarantine_pass: state.quarantine_pass
})

export default connect(mapStateProps, { handleInputOnChange, handleSubmit })(QuaratinePass)
