import React, { useEffect } from 'react';
import { MiniSpinner } from '../../Layouts/Spinner';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getCategories, handleSelectTrivia, handleInputOnChange, getTriviaAPIToken, getQuestions } from '../../Redux/actions/setup_quiz/setup_quiz.actions';


function SetupQuiz ({ setup_quiz: { loading, trivia_amounts, trivia_categories, trivia_types, trivia_difficulties, params: { amount, category, difficulty, type } }, getQuestions, getTriviaAPIToken, handleSelectTrivia, handleInputOnChange, getCategories, show, onHide}) {

    useEffect(() => {
        getCategories();
        getTriviaAPIToken();

        return () => {
            getCategories();
            getTriviaAPIToken();
        }
    }, [])

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
                        <div className="form-group">
                            <label htmlFor="sel-amount">Number of Questions</label>
                            <Select options={trivia_amounts} onChange={handleSelectTrivia} defaultValue={amount} id="sel-amount"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Select Category</label>
                            <Select options={trivia_categories} onChange={handleSelectTrivia} defaultValue={category} id="sel-category"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="difficulty">Select Difficulty</label>
                            <Select options={trivia_difficulties} onChange={handleSelectTrivia} defaultValue={difficulty} id="sel-difficulty"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sel-type">Select Type</label>
                            <Select options={trivia_types} onChange={handleSelectTrivia} defaultValue={type} id="sel-type"/>
                        </div>
                    
                        <div className="form-group mt-2">
                            <button type="submit" className="btn btn-dark btn-block">Setup Quiz</button>
                            <button type="button" onClick={onHide} className="btn btn-danger btn-block">Cancel</button>
                        </div>
                    </form>
                }
            </Modal.Body>
		</Modal>
    )
}

const mapStateToProps = state => ({
    setup_quiz: state.setup_quiz,
})

export default connect(mapStateToProps, { getQuestions, getTriviaAPIToken,getCategories, handleSelectTrivia, handleInputOnChange })(SetupQuiz)
