import React, { useEffect, Fragment, useState, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuestions,  getCurrentQuestion, handleOnChangeButton , setCounter, setNextQuestion} from '../../Redux/actions/quiz/quiz.actions';
import Interweave, { Markup } from 'interweave';
import { renderHTML, getQuizStart } from '../../Utils/Common';
import { Spinner } from 'react-bootstrap';

function QuizView({ quiz: { counter, score, current_question, question_index, questions_data, loading, validation, timeout },
     getCurrentQuestion, handleOnChangeButton, setCounter, setNextQuestion}) {

    useEffect(() => {
        getCurrentQuestion();
        const value = counter <= 10 ? `0${counter - 1}` : counter - 1;
        const timer = counter > 0 && setInterval(() => setCounter(value), 1000);
        
        if(counter == 0)
        {
            setNextQuestion(question_index)
        }

        return () => clearInterval(timer);
    },[counter])

    if(!getQuizStart())
    {
        return <Redirect to='/dashboard'/>
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-12">
                    <div className="row">
                        <div className="col-4 text-center">
                            <div className="card card-body">
                                <div>Quiz</div>
                                <h4>{question_index + 1}/{questions_data.length}</h4>
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <div className={counter <= 5 ? 'card card-body border-danger' : 'card card-body'}>
                                <div>Timer</div>
                                <h4 className="text-danger"><strong>{counter}</strong></h4>
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <div className="card card-body">
                                <div>Score</div>
                                <h4>{score}</h4>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="text-center"> QUESTION </div><hr/>
                                    {
                                        loading ? <Spinner/>
                                        :
                                        <Fragment>
                                            <p className="mb-4">{renderHTML(current_question.question)}</p>
                                            {
                                                current_question.incorrect_answers && current_question.incorrect_answers.map((choice, i) => (
                                                    <div>
                                                        <input onClick={() => handleOnChangeButton(choice)} type="button" value={choice} className="btn btn-block mb-2 waves"/>
                                                    </div>
                                                ))
                                            }
                                        </Fragment>
                                    }
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz
})

export default connect(mapStateToProps, { getCurrentQuestion, handleOnChangeButton, setCounter, setNextQuestion })(QuizView)
