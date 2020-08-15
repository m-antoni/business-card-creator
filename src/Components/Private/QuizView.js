import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBInput, MDBCardText, MDBCardFooter } from 'mdbreact';
import { getQuestions,  isStart} from '../../Redux/actions/quiz/quiz.actions';

function QuizView({ quiz: { is_start, score }, isStart}) {

  
    return (
        <MDBContainer>
            <MDBRow center={true}>
                <MDBCol md="6">
                    <MDBRow center={true}>
                        <MDBCol size="12">
                            <h4 className="float-right text-success"> Score: {score}</h4> 
                        </MDBCol>
                    </MDBRow>
                    <MDBCard>
                        <MDBCardBody>
                            <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elro?</p>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                <label class="form-check-label" for="exampleRadios1"> Default radio</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                <label class="form-check-label" for="exampleRadios2"> Second default radio</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option2" />
                                <label class="form-check-label" for="exampleRadios3"> Second default radio</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option2" />
                                <label class="form-check-label" for="exampleRadios4"> Second default radio</label>
                            </div>
                        </MDBCardBody>
                        <MDBCardFooter>
                            <MDBBtn color="blue">Submit Answer</MDBBtn>
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

export default connect(mapStateToProps, { isStart })(QuizView)
