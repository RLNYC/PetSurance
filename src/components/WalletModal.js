import React from 'react';

import MetaMask from '../images/metamasklogo.png';
import Torus from '../images/toruslogo.png';

function WalletModal({ openWithTorus, openWithMetaMask }){
    return(
        <div className="container my-5">
            <div className="modal fade" id="walletModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Open With</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex justify-content-around mt-3">
                                <div>
                                    <img
                                        className="wallet-img"
                                        src={Torus}
                                        alt="Torus"
                                        onClick={openWithTorus}
                                        data-dismiss="modal" />
                                    <p className="lead text-center mt-2">Torus</p>
                                </div>
                               
                                <div>
                                    <img
                                        className="wallet-img"
                                        src={MetaMask}
                                        alt="Metamask"
                                        onClick={openWithMetaMask}
                                        data-dismiss="modal" />
                                    <p className="lead text-center mt-2">Metamask</p>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletModal;