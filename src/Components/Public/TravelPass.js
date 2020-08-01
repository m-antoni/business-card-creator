import React from 'react'

function TravelPass() {
    return (
        <div className="container">
            <div className="row">
               <div className="mx-auto col-md-5">
                    <div className="travel-pass card card-body">
                        <h4 classNam="text-center">Travel Pass</h4> <hr/>
                        <form>
                            <div className="form-group">
                                <label htmlFor="">Full Name:</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Age:</label>
                                <input type="number" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Address:</label>
                                <textarea type="text" className="form-control" rows="2"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Phone Number:</label>
                                <input type="number" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Email:</label>
                                <input type="number" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Purpose of Travel:</label>
                                <textarea type="text" className="form-control" rows="2"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Destination:</label>
                                <textarea type="text" className="form-control" rows="2"></textarea>
                            </div>

                            <div className="form-group mt-4">
                                <button type="button" class="btn btn-primary btn-block">Generate Pass</button>
                                <a href="/generate" class="btn btn-danger btn-block">Cancel</a>
                            </div>
                        </form>
                    </div>  
               </div>
            </div>
        </div>
    )
}

export default TravelPass
