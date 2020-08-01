import React from 'react'

function Generate() {
    return (
        <div className="container">
            <div id="home-column">
                <div className="row">
                    <div className="col-12">
                        <a href="/" className="btn btn-danger mb-2">Go back</a>
                    </div>
                    <div className="col-md-6 col-6">
                        <a href="/generate/quarantine-pass"><img src="assets/img/generate-pass.jpeg" className="img-fluid" alt="pass"/></a>
                        <h4 className="text-center mt-2 subheader">Quarantine Pass</h4>
                    </div>
                    <div className="col-md-6 col-6">
                        <a href="/generate/travel-pass"><img src="assets/img/travel.jpeg" className="img-fluid" alt="travel"/></a>
                        <h4 className="text-center mt-2 subheader">Travel Pass</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generate
