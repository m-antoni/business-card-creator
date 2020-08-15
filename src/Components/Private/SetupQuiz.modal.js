import React, { useEffect } from 'react';
import { MiniSpinner } from '../../Layouts/Spinner';
import { Modal } from 'react-bootstrap';
import { MDBContainer, MDBBtn, MDBInput } from "mdbreact";
import Select from 'react-select';
import { connect } from 'react-redux';
import { handleSelectTrivia, handleInputOnChange, getQuestions } from '../../Redux/actions/quiz/quiz.actions';


function SetupQuiz ({ quiz: { loading, trivia_amounts, trivia_categories, trivia_types, trivia_difficulties, params: { amount, category, difficulty, type } }, getQuestions, handleSelectTrivia, handleInputOnChange, show, onHide}) {

    return (
		<Modal className="modal-container" show={show} onHide={onHide} size="md" animation={true}>
		    <Modal.Header closeButton>
                <Modal.Title><h5 className="text-muted">Setup your Quiz</h5></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    loading ? <div className="my-5"><MiniSpinner/></div>
                    :
                    <form onSubmit={getQuestions}>
                        {/* <div className="form-group">
                            <label htmlFor="sel-amount">Number of Questions</label>
                            <Select options={trivia_amounts} onChange={handleSelectTrivia} defaultValue={amount} id="sel-amount"/>
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="category">Select Category</label>
                            <Select options={trivia_categories} onChange={handleSelectTrivia} defaultValue={category} id="sel-category"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="difficulty">Select Difficulty</label>
                            <Select options={trivia_difficulties} onChange={handleSelectTrivia} defaultValue={difficulty} id="sel-difficulty"/>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="sel-type">Select Type</label>
                            <Select options={trivia_types} onChange={handleSelectTrivia} defaultValue={type} id="sel-type"/>
                        </div> */}
                    
                        <div className="form-group mt-2">
                            <MDBBtn type="submit" className="btn btn-primary btn-block">Setup Quiz</MDBBtn>
                            {/* <button type="button" onClick={onHide} className="btn btn-danger btn-block">Cancel</button> */}
                        </div>
                    </form>
                }
            </Modal.Body>
		</Modal>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz,
})

export default connect(mapStateToProps, { getQuestions, handleSelectTrivia, handleInputOnChange })(SetupQuiz)
