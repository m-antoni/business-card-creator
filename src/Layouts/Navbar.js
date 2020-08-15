import React from 'react'
import { connect } from 'react-redux';
import { handleSignOut } from '../Redux/actions/auth/auth.actions';

function Navbar({ handleSignOut }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container">
                <a className="navbar-brand" href="/"><i className="fa fa-notes-medical"></i> Quiz App</a>
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbarColor01">
                    <ul align="center" className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a onClick={() => handleSignOut()} className="nav-link" href="#">Sign-out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { handleSignOut })(Navbar);
