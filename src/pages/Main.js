import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Hero from '../components/Hero';

function Main({ petSuranceBlockchain, getBalance, account }) {
    const { referLink, referer } = useParams();

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
            else setIsReferer(false);
        }

        if(petSuranceBlockchain){
            checkUserIsReferer();
            getUserReward()
        }

    }, [petSuranceBlockchain, account, referLink])

    const createReferer = async () => {
        let res;
        if(referLink){
            res = await petSuranceBlockchain.methods.addReferer(referLink).send({ from: account });
        }
        else{
            res = await petSuranceBlockchain.methods.createReferer().send({ from: account });
        }

        setIsReferer(true);
        console.log(res);
    }
    
    const purchaseTicket = async () => {
        console.log(referLink)
        await petSuranceBlockchain.methods.sendPoints(referLink, referer || referLink).send({ from: account });

        const reward = await petSuranceBlockchain.methods.points(account).call();
        console.log(reward)
        setPoint(reward);
    }

    const copyRefererLink = () => {
        console.log(referLink)
        if(referLink){
            navigator.clipboard.writeText(`${window.location.href}/${account}`);
        }
        else{
            navigator.clipboard.writeText(`${window.location.href}${account}`);
        }
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
            <Hero purchaseTicket={purchaseTicket} account={account} />
           {!account ? (
                <h2 className="mt-2">
                    Connect to your wallet to purchase
                </h2>
           ) : (
                <div>
                    <h2 className="mb-0">Referer Link</h2>
                    <p>Earn commission when someone purchase with your referer link</p>
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
           )}
        </div>
    )
}

export default Main;
