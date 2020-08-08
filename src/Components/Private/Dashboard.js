import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { MiniSpinner } from '../../Layouts/Spinner';
import SetupQuiz from './SetupQuiz.modal';
import { setModal } from '../../Redux/actions/quiz/quiz.actions';

function Dashboard({ quiz: { setup_quiz_modal }, setModal }) {
    
    return (
        <Fragment>
            <div className="container">
                <div className="pass my-2">
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-12 mt-4">
                            <div className="card">
                                <img src="/assets/img/quiz.jpeg" className="card-img-top img-fluid" alt="quiz"/>
                                <div className="card-body">
                                    <h4>Take a Quiz</h4>
                                    <p>Features: select category, amount of questions, type of Answers</p>
                                    <button onClick={() => setModal('setup_quiz_modal')} type="button" className="btn btn-primary">Click Here</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SetupQuiz show={setup_quiz_modal} onHide={() => setModal('setup_quiz_modal', false)}/>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz
})

export default connect(mapStateToProps, { setModal })(Dashboard)
