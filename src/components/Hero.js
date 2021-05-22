import React from 'react';

function Hero({ purchaseTicket, account }) {
    return (
        <div className="jumbotron bg-light pt-1 pb-4 mt-1 mb-2">
            <h1 className="text-center text-warning mt-3">
                Pet Insurance Plans for Your Pet
            </h1>
            <p className="text-center">
                Pet insurance covers your dog or cat in case of unexpected injuries or illnesses
            </p>
            <div className="row">
                <div className="col-12 col-md-4">
                    <h5>ACCIDENTS</h5>
                    <ul>
                        <li>Injuries</li>
                        <li>Swallowed Objects</li>
                        <li>Toxic Ingestions</li>
                    </ul>  
                </div>
                <div className="col-12 col-md-4">
                    <h5>BEHAVIORAL ISSUES</h5>
                    <ul>
                        <li>Excessive licking</li>
                        <li>Tail chasing</li>
                        <li>Destructive chewing</li>
                    </ul>  
                </div>
                <div className="col-12 col-md-4">
                    <h5>HEREDITARY & CONGENITAL CONDITIONS</h5>
                    <ul>
                        <li>Hip Dysplasia</li>
                        <li>Heart Disease</li>
                        <li>IVDD</li>
                    </ul>  
                </div>
                <div className="col-12 col-md-4">
                    <h5>DENTAL DISEASE</h5>
                    <ul>
                        <li>Gingivitis</li>
                        <li>Periodontitis</li>
                        <li>Destructive chewing</li>
                    </ul>  
                </div>
                <div className="col-12 col-md-4">
                    <h5>ILLNESSES</h5>
                    <ul>
                        <li>Cancer</li>
                        <li>Respiratory infection</li>
                        <li>Diabetes</li>
                    </ul>  
                </div>
                <div className="col-12 col-md-4">
                    <h5>PREVENTIVE SERVICES</h5>
                    <ul>
                        <li>Annual Exams</li>
                        <li>Dental Cleanings</li>
                        <li>Flea and Heartworm Prevention</li>
                    </ul>  
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="h2">
                    Price: <span className="badge badge-info">1 ETH</span>
                </h4>
                {account && <button className="btn btn-danger btn-lg" onClick={purchaseTicket}>
                    Purchase
                </button>}
            </div>
        </div>
    )
}

export default Hero;
