import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { MiniSpinner } from '../../Layouts/Spinner';
import SetupQuiz from './SetupQuiz.modal';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn, MDBCardBody } from "mdbreact";
import { setModal, getCategories, getTriviaAPIToken } from '../../Redux/actions/quiz/quiz.actions';

function Dashboard({ quiz: { setup_quiz_modal }, setModal, getCategories, getTriviaAPIToken }) {
    
    useEffect(() => {
        getCategories();
        getTriviaAPIToken();
    },[]);

    return (
        <Fragment>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                    <MDBCard>
                        <MDBCardImage className="img-fluid" src="/assets/img/quiz.jpeg" waves />
                        <MDBCardBody>
                        <MDBCardTitle>Take A Quiz</MDBCardTitle>
                        <MDBCardText>Click below to chose your category.</MDBCardText>
                        <MDBBtn onClick={() => setModal('setup_quiz_modal')} href="#">Click</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                    <MDBCol md="6"></MDBCol>
                </MDBRow>
            </MDBContainer>
            
            <SetupQuiz show={setup_quiz_modal} onHide={() => setModal('setup_quiz_modal', false)}/>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz
})

export default connect(mapStateToProps, { setModal, getCategories, getTriviaAPIToken })(Dashboard)
