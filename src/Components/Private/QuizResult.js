import React from 'react'
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getScore } from '../../Utils/Common';

function QuizResult({ quiz:{ result, dashboard_url } }) {

    if(!result) return <Redirect to={dashboard_url}/>

    const score = getScore();
 
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 col-12">
                    <div className="card card-body">
                        <div className="text-center">
                            <h3 className="text-success">Congratulations!</h3>
                                <hr/>
                                <div className="my-2">SCORE</div>
                                <h2>{score} <span style={textStyle}>of</span> 10</h2>
                                <hr/>
                            <a href={dashboard_url} className="btn btn-block mt-2">Try Again</a>
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

export default connect(mapStateToProps,{})(QuizResult);

const textStyle = {
    position: 'relative',
    fontSize: '20px',
}