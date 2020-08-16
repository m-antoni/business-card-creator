import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBInput, MDBCardText, MDBCardFooter } from 'mdbreact';
import { getQuestions,  getCurrentQuestion, handleOnChangeRadio, handleSubmitAnswer} from '../../Redux/actions/quiz/quiz.actions';
import Interweave, { Markup } from 'interweave';
import { renderHTML } from '../../Utils/Common';

function QuizView({ quiz: { start, score, current_question, question_index, questions_data }, getCurrentQuestion, handleOnChangeRadio, handleSubmitAnswer}) {

    useEffect(() => {
        getCurrentQuestion();
    },[])

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
                        <p className="mb-3">{renderHTML(current_question.question)}</p>
                        {
                           current_question.incorrect_answers && current_question.incorrect_answers.map((choice, i) => (
                                <div class="form-check mb-2">
                                    <input class="form-check-input" onChange={handleOnChangeRadio} type="radio" name="exampleRadios" id={i} value={choice} />
                                    <label class="form-check-label" for={i}>{choice}</label>
                                </div>
                            ))
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
