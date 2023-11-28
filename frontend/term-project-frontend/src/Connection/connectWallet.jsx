
const connectToMetaMask = async () => {
    try {
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected to MetaMask');
      
      return true;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      
      return false;
    }
  };
  
  export default connectToMetaMask;
  