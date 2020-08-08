import React from 'react';
import { connect } from 'react-redux';
import { MiniSpinner } from '../../Layouts/Spinner';

function ForgorPassword({ auth: { loading } }) {

    return (
        <div className="container">
            <div className="row">
               <div className="mx-auto col-md-5">
                    <div className="my-5 card card-body">
                        <h4 classNam="text-center">Forgot Password</h4> <hr/>
                        {
                            loading ? <MiniSpinner/>
                            :
                            <form>
                                <div className="form-group">
                                    <label htmlFor="">Email Address:</label>
                                    <input type="email" name="email" className="form-control" required/>
                                </div>
                                <div className="form-group mt-4">
                                    <button type="button" class="btn btn-dark btn-block">Send Password</button>
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

export default connect(mapStateProps, { })(ForgorPassword)
