import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import WalletConnectForm from './WalletConnectForm';
import styles from './WalletConnect.module.css';

const WalletConnect = ({ walletName, walletLogo, setDisplayConnect }) => {
  const [autoConnect, setAutoConnect] = useState('Connecting...');
  const [connected, setConnected] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoConnect('Error Connecting!');
      setConnected(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {displayForm && <WalletConnectForm walletName={walletName} walletLogo={walletLogo} />}
      <section className={styles.walletConnect}>
        <section className={styles.innerSection}>
          <div className={styles.buttonContainer}>
            <button onClick={() => setDisplayConnect(false)} className={styles.backButton}>
              Back
            </button>
          </div>

          <div className={styles.autoConnect}>
            <div 
              className={styles.autoConnectContainer} 
                >
              <p className={styles.autoConnectText} style={{ color: connected ? '#ef4444' : '#00e400' }} >{autoConnect}</p>
              {connected && (
                <button onClick={() => setDisplayForm(true)} className={styles.connectManuallyButton}>
                  Connect Manually
                </button>
              )}
            </div>
          </div>


          <div className={styles.wallet}>
            <div className={styles.walletInfo}>
              <div className={styles.walletInfoContent}>
                <h3 className={styles.walletName}>{walletName}</h3>
                <p className={styles.walletDescription}>Easy-to-use browser extension</p>
              </div>
              <div className={styles.walletLogo}>
                <img src={walletLogo} alt="" className={styles.walletLogoImage} />
              </div>
            </div>
          </div>
          
        </section>
      </section>
    </>
  );
};

export default WalletConnect;
