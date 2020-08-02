import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { MiniSpinner } from '../../Layouts/Spinner';

function Dashboard({ auth: { loading } }) {
    
    return (
        <Fragment>
            <div className="container">
               {
                   loading ? <div className="my-5 py-5"><MiniSpinner/></div>
                   :
                   <div className="pass my-2">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-12 mt-4">
                                <div className="card">
                                    <img src="/assets/img/generate-pass.jpeg" className="card-img-top img-fluid" alt="pass"/>
                                    <div className="card-body">
                                        <h4>Quarantine Pass</h4>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi odio eum laudantium quis excepturi quo voluptate nobis id dolorum quaerat. Eius placeat nulla exercitationem ea. Beatae inventore laboriosam tempora ad?</p>
                                        <button className="btn btn-primary"><i className="fa fa-file"></i> Generate Pass</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-6 col-12 mt-4">
                                <div className="card">
                                    <img src="/assets/img/travel-pass.jpeg" className="card-img-top img-fluid" alt="pass"/>
                                    <div className="card-body">
                                        <h4>Travel Pass</h4>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi odio eum laudantium quis excepturi quo voluptate nobis id dolorum quaerat. Eius placeat nulla exercitationem ea. Beatae inventore laboriosam tempora ad?</p>
                                        <button className="btn btn-primary"><i className="fa fa-file"></i> Generate Pass</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               }
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { })(Dashboard)
