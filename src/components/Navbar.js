import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ account, tokens }) {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand mb-0 h1 p-0" to="/">
                    PetSurance
                </Link>
                <div className="d-flex align-items-center">
                    {account && <p className="badge mt-3 mr-3">
                    {window.web3.utils?.fromWei(tokens.toString(), 'Ether')} PST
                    </p>}
                    <button
                        className="btn btn-warning btn-lg my-2 my-sm-0"
                        data-toggle="modal"
                        data-target="#walletModal"
                    >
                        {account ? account.substring(0, 7) + '...' + account.substring(35, 42) : 'Connect to Wallet'}
                    </button>
                </div>
                
            </div>
            
        </nav>
    )
}

export default Navbar;
