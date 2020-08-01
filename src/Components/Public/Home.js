import React from 'react'

function Home() {
    return (
        <div className="container-fluid">
            <div className="home">
                <div className="row">
                    <div className="col-md-4 offset-8">
                        <h4>COVID 19 Pass</h4>

                        <div>
                            <a href="/generate" className="btn btn-primary btn-lg">GENERATE PASS</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
