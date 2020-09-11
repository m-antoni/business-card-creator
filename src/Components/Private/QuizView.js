import React, { useEffect, Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBInput, MDBCardText, MDBCardFooter } from 'mdbreact';
import { getQuestions,  getCurrentQuestion, handleOnChangeRadio, handleSubmitAnswer} from '../../Redux/actions/quiz/quiz.actions';
import Interweave, { Markup } from 'interweave';
import { renderHTML, getQuizStart } from '../../Utils/Common';
import { Spinner } from 'react-bootstrap';

function QuizView({ quiz: { score, current_question, question_index, questions_data, loading }, getCurrentQuestion, handleOnChangeRadio, handleSubmitAnswer}) {

    const [counter, setCounter] = useState(60);

    useEffect(() => {
        getCurrentQuestion();
        const value = counter <= 10 ? `0${counter - 1}` : counter - 1;
        const timer = counter > 0 && setInterval(() => setCounter(value), 1000); 
        return () => clearInterval(timer);
    },[counter])

    if(!getQuizStart())
    {
        return <Redirect to='/dashboard'/>
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-4 text-center">
                    <div className="card card-body">
                        <div>Quiz</div>
                        <h4>{question_index + 1}/{questions_data.length}</h4>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="card card-body">
                        <div>Timer</div>
                        <h4 className="text-danger"><strong>{counter}</strong></h4>
                    </div>
                </div>
                <div className="col-4 text-center">
                    <div className="card card-body">
                        <div>Score</div>
                        <h4> {score}</h4>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card mt-3">
                        <div className="card-body">
                            {
                                loading ? <Spinner/>
                                :
                                <Fragment>
                                    <p className="mb-3">{renderHTML(current_question.question)}</p>
                                    {
                                        current_question.incorrect_answers && current_question.incorrect_answers.map((choice, i) => (
                                            <div class="form-check mb-2">
                                                <input class="form-check-input" onChange={handleOnChangeRadio} type="radio" name="radio-answer" id={i} value={choice} />
                                                <label class="form-check-label" for={i}>{renderHTML(choice)}</label>
                                            </div>
                                        ))
                                    }
                                </Fragment>
                            }
                        </div>
                        {/* <button onClick={handleSubmitAnswer} className="btn btn-primary">Submit</button> */}
                    </div> 
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz
})

export default connect(mapStateToProps, { getCurrentQuestion, handleOnChangeRadio, handleSubmitAnswer })(QuizView)
