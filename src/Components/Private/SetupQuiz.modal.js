import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { fetchCategories, handleSelectTrivia, handleInputOnChange, fetchQuestions } from '../../Redux/actions/quiz/quiz.actions';

function SetupQuiz ({ open_trivia:{ trivia_categories, types, difficulties, categories_default_value, difficulties_default_value, types_default_value }, fetchQuestions, handleSelectTrivia, handleInputOnChange, fetchCategories, show, onHide}) {

    useEffect(() => {
        fetchCategories()
        return () => {
            fetchCategories()
        }
    }, [])

    return (
		<Modal className="modal-container" show={show} onHide={onHide} size="md" animation={true}>
		    <Modal.Header closeButton>
                <Modal.Title><h5 className="text-muted">Setup your Quiz</h5></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="sel-questions">Number of Questions</label>
                        <input onChange={handleInputOnChange} name="amount" type="number" id="sel-questions" className="form-control" min={10} max={50} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Select Category</label>
                        <Select options={trivia_categories} onChange={handleSelectTrivia} defaultValue={categories_default_value} id="sel-category" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="difficulty">Select Difficulty</label>
                        <Select options={difficulties} onChange={handleSelectTrivia} defaultValue={difficulties_default_value} id="sel-difficulty" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sel-type">Select Type</label>
                        <Select options={types} onChange={handleSelectTrivia} defaultValue={types_default_value} id="sel-type" required/>
                    </div>
                   
                    <div className="form-group mt-2">
                        <button type="submit" onClick={fetchQuestions} className="btn btn-dark btn-block">Setup Quiz</button>
                        <button type="button" onClick={onHide} className="btn btn-danger btn-block">Cancel</button>
                    </div>
                </form>
            </Modal.Body>
		</Modal>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz,
    open_trivia: state.quiz.open_trivia
})

export default connect(mapStateToProps, { fetchQuestions, fetchCategories, handleSelectTrivia, handleInputOnChange })(SetupQuiz)
