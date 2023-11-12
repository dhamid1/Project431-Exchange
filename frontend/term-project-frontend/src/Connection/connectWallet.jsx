// MetaMaskConnect.js
const connectToMetaMask = async () => {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected to MetaMask');
      // You can add more logic here after successful connection
      return true;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      // Handle errors, e.g., display a message to the user
      return false;
    }
  };
  
  export default connectToMetaMask;
  