import React, { useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBInput, MDBCardText, MDBCardFooter } from 'mdbreact';
import { getQuestions,  getCurrentQuestion, handleOnChangeRadio, handleSubmitAnswer} from '../../Redux/actions/quiz/quiz.actions';
import Interweave, { Markup } from 'interweave';
import { renderHTML, getQuizStart } from '../../Utils/Common';
import { Spinner } from 'react-bootstrap';

function QuizView({ quiz: { score, current_question, question_index, questions_data, loading }, getCurrentQuestion, handleOnChangeRadio, handleSubmitAnswer}) {

    useEffect(() => {
        getCurrentQuestion();
    },[])

    if(!getQuizStart())
    {
        return <Redirect to='/dashboard'/>
    }

    return (
        <MDBContainer>
            <MDBRow center={true}>
                <MDBCol md="8">
                    <MDBRow center={true}>
                        <MDBCol size="12">
                            <h4 className="float-right text-success"> Score: {score}</h4> 
                        </MDBCol>
                    </MDBRow>
                    <MDBCard>
                        <MDBCardBody>
                        <MDBCardTitle>Question No: {question_index + 1}/{questions_data.length}</MDBCardTitle>
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
                        </MDBCardBody>
                        <MDBCardFooter>
                            <MDBBtn color="blue" onClick={handleSubmitAnswer}>Submit Answer</MDBBtn>
                            <MDBBtn color="danger">QUIT</MDBBtn>
                        </MDBCardFooter>
                    </MDBCard>    
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz
})

export default connect(mapStateToProps, { getCurrentQuestion, handleOnChangeRadio, handleSubmitAnswer })(QuizView)
