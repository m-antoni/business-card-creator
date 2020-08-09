import React, { useEffect } from 'react';
import { MiniSpinner } from '../../Layouts/Spinner';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { fetchCategories, handleSelectTrivia, handleInputOnChange, fetchQuestions, fetchTriviaAPIToken } from '../../Redux/actions/setup_quiz/setup_quiz.actions';


function SetupQuiz ({ setup_quiz: { loading, trivia_categories, trivia_types, trivia_difficulties, params: { amount, category, difficulty, type } }, fetchQuestions, fetchTriviaAPIToken, handleSelectTrivia, handleInputOnChange, fetchCategories, show, onHide}) {

    useEffect(() => {
        fetchCategories();
        fetchTriviaAPIToken();
        return () => {
            fetchCategories();
            fetchTriviaAPIToken();
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
                    <form onSubmit={fetchQuestions}>
                        <div className="form-group">
                            <label htmlFor="sel-questions">Number of Questions</label>
                            <input onChange={handleInputOnChange} value={amount} name="amount" type="text" id="sel-questions" className="form-control"/>
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

export default connect(mapStateToProps, { fetchQuestions, fetchTriviaAPIToken, fetchCategories, handleSelectTrivia, handleInputOnChange })(SetupQuiz)
