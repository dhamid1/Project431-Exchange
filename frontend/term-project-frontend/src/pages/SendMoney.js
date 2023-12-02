import React, { useEffect, useState } from "react";
import './Send.css';
import abi from "../utils/EthereumTransactions.json";
const ethers = require("ethers");


function SendMoney() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ receiver: '', amount: '', message: '' });

  const contractAddress = "0x65688a2b6E54ACB5E23Fa79669B4258Db23b4780";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have an ETH wallet!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      // Pulls array of accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const txs = await contract.getAllEtherTransactions();
        setTransactions(txs);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Need an ETH wallet to connect to!");
        return;
      }

      // Makes request to connect to ETH account (Metamask wallet)
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);

      // Set the currAccount state within this component to know the address of the account
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ethereum } = window;
  
    if (!ethereum) {
      console.log("ETH window object doesn't exist...");
      return;
    }
  
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    if (!currentAccount) {
      await connectWallet();
    }
  
    if (currentAccount) {
      const { receiver, amount, message } = form;
      if (!amount || isNaN(amount)) {
        alert('Please enter a valid number for the amount.');
        return;
      }
  
      try {
        const sendEtherTxn = await contract.sendEther(receiver, ethers.parseEther(amount), message);
        console.log("Waiting for transaction to be mined...", sendEtherTxn.hash);
        await sendEtherTxn.wait();
        console.log("Transaction mined: ", sendEtherTxn.hash);
        const txs = await contract.getAllEtherTransactions();
        setTransactions(txs);
      } catch (error) {
        console.error("Failed to send transaction:", error);
      }
    }
  };
  
  
  

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


return (
    <div className="container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Send Money and Make It Easier</h2>
        <div className="form-input">
          <label>Receiver</label>
          <input name="receiver" placeholder="Receiver" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label>Amount</label>
          <input name="amount" placeholder="Amount" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label>Message</label>
          <input name="message" placeholder="Message" onChange={handleInput} />
        </div>
        <button type="submit">Send</button>
      </form>
      <div className="previous-transactions">
        <h2>Previous Transactions</h2>
        <div className="transaction-list">
          {transactions.map((tx, i) => (
            <div className="transaction" key={i}>
              <p>From: {tx.sender.substring(0, 6)}</p>
              <p>To: {tx.receiver.substring(0, 6)}</p>
              <p>Amount: {ethers.formatEther(tx.amount).substring(0, 6)}</p>
              <p>Message: {tx.message}</p>
              <p>Timestamp: {new Date(Number(tx.timestamp) * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
  
}

export default SendMoney;
