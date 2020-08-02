import React from 'react'

function Home() {
    return (
        <div className="container-fluid">
            <div className="home">
                <div className="row">
                    <div className="col-md-4 offset-4">
                       <div className="card card-body">
                       <h4 className="text-center">COVID 19 Pass</h4>

                       
                            <a href="/signin" className="btn btn-primary btn-lg mb-2">Sign In</a>

                            <a href="/signup" className="btn btn-primary btn-lg mb-2">Sign Up</a>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
