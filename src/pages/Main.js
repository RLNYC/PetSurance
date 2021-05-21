import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Main({ petSuranceBlockchain, getBalance, account }) {
    const { referLink } = useParams();

    const [isReferer, setIsReferer] = useState(false);
    const [point, setPoint] = useState('0');

    useEffect(() => {
        const getUserReward = async () => {
            const reward = await petSuranceBlockchain.methods.points(account).call();
            setPoint(reward);
        }

        const checkUserIsReferer = async () => {
            const isReferer = await petSuranceBlockchain.methods.referers(account).call();
            if(isReferer !== '0x0000000000000000000000000000000000000000') setIsReferer(true);
        }

        if(petSuranceBlockchain){
            checkUserIsReferer();
            getUserReward()
        }

    }, [petSuranceBlockchain, account, referLink])

    const createReferer = async () => {
        let res = await petSuranceBlockchain.methods.createReferer().send({ from: account });

        setIsReferer(true);
        console.log(res);
    }
    
    const purchaseTicket = async () => {
        await petSuranceBlockchain.methods.sendPoints(referLink).send({ from: account });

        const reward = await petSuranceBlockchain.methods.points(account).call();
        console.log(reward)
        setPoint(reward);
    }

    const copyRefererLink = () => {
        navigator.clipboard.writeText(`${window.location.href}/referer/${account}`);
    }

    const claimToken = async () => {
        try{
            await petSuranceBlockchain.methods.withdrawTokens().send({ from: account });
            setPoint(0);
            getBalance();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
            <h1>Pet Insurance Plans for Your Pet</h1>
            <h4>
                Price: <span className="badge badge-info">1 ETH</span>
            </h4>
           {!account ? (
                <h2 className="mt-2">
                    Connect to your wallet to purchase
                </h2>
           ) : (
                <div className="row">
                    <div className="col-12 col-md-6">
                        <button className="btn btn-danger mb-4" onClick={purchaseTicket}>
                            Purchase Ticket
                        </button>
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>Promote Event to earn reward tokens</h2>
                        { isReferer ? (
                            <>
                                <button className="btn btn-success" onClick={copyRefererLink}>
                                    Copy Link
                                </button>
                                
                            </>
                        ) : <button className="btn btn-success" onClick={createReferer}>
                                Create Referer Link
                            </button>
                        }
                        <p className="mt-3"><strong>Your reward:</strong> {window.web3.utils?.fromWei(point.toString(), 'Ether')} PST</p>
                        {point != 0 && <button className="btn btn-warning" onClick={claimToken}>
                            Claim PST
                        </button> }
                    </div>
                </div>
           )}
        </div>
    )
}

export default Main;
