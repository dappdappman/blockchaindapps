import {useState } from 'react';
import styles from './SelectWalletContainer.module.css';
import SupportedData from '../../components/Home/SupportedData';
import Onboardscreens from '../../pages/Onboardscreens';

const SelectWalletContainer = () => {

  const [walletName, setWalletName] = useState('');
  const [walletLogo, setWalletLogo] = useState();
  const [displayConnect, setDisplayConnect] = useState(false)

  return (
    <>
      {
        displayConnect && 
        <Onboardscreens
          walletName={walletName} 
          walletLogo={walletLogo} 
        />
      }
      <section className={styles.container}>
        <div className={styles.logo}>
          <h2>Supported <span className={styles.logoHeading}>Dapp Protocols</span></h2>
          <p>Standard open protocols enabling Wallet-Dapp connection</p>
        </div>

        <section className={styles.inner}>
          <div className={styles.innerContainer}>
            {SupportedData.map(data => (
              <div
                key={data.id}
                className={styles.walletContainer}
                onClick={() => {
                  setWalletName(data.walletName)
                  setWalletLogo(data.walletLogo)
                  setDisplayConnect(true)
                }}
              >
                <div className={styles.walletInfo}>
                  <p>
                    <span className={styles.walletName}>{data.walletName}</span>
                  </p>
                  <p className={styles.walletDescription}>{data.walletDescription}</p>
                </div>
                <div className={styles.walletImageContainer}>
                  <div className={styles.walletImage}>
                    <img src={data.walletLogo} alt={data.walletName} />
                  </div>
                  <div className={styles.walletTag}>Dapp</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default SelectWalletContainer;
