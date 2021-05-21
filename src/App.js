import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Torus from '@toruslabs/torus-embed';
import Web3 from 'web3';

import './App.css';
import PetSurance from './abis/PetSurance.json';
import Token from './abis/Token.json';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import WalletModal from './components/WalletModal';

function App() {
  const [account, setAccount] = useState('');
  const [petSuranceBlockchain, setPetSuranceBlockchain] = useState(null);
  const [tokenBlockchain, setTokenBlockchain] = useState(null);
  const [tokens, setTokens] = useState(0);
 
  const openWithTorus = async () => {
    const torus = new Torus();
    await torus.init(
      {
        network: {
          host: 'mumbai',
          chainId: "80001",
          networkName: "Mumbai Test Network"
        }
      }
    );
    await torus.login();
    const web3 = new Web3(torus.provider);
    window.web3 = web3;

    loadBlockchain();
  }
  
  const openWithMetaMask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
      loadBlockchain();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      loadBlockchain();
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  const loadBlockchain = async () => {
    const web3 = window.web3;

    const netId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();

    setAccount(accounts[0]);

    if(netId){
      const token = await new web3.eth.Contract(Token.abi, Token.networks[netId].address);
      setTokenBlockchain(token)
      const petSurance = await new web3.eth.Contract(PetSurance.abi, PetSurance.networks[netId].address);
      setPetSuranceBlockchain(petSurance);

      const tokenAmount = await token.methods.balanceOf(accounts[0]).call();
      setTokens(tokenAmount);
    }
    else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  const getBalance = async () => {
    const tokenAmount = await tokenBlockchain.methods.balanceOf(account).call();
    setTokens(tokenAmount);
  }

  return (
    <Router className="App">
      <Navbar
        openWithTorus={openWithTorus}
        account={account}
        tokens={tokens} />
      <Switch>
        <Route path="/referer/:referLink">
          <Main
            petSuranceBlockchain={petSuranceBlockchain}
            getBalance={getBalance}
            account={account} />
        </Route>
        <Route path="/">
          <Main
            petSuranceBlockchain={petSuranceBlockchain}
            getBalance={getBalance}
            account={account} />
        </Route>
      </Switch>
      <WalletModal openWithTorus={openWithTorus} openWithMetaMask={openWithMetaMask} />
    </Router>
  );
}

export default App;
