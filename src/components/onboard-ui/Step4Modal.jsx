import React, { useState } from 'react';
import style from './Step4Modal.module.css';
import { BsShieldLockFill } from "react-icons/bs";
import WalletConnectForm from '../SelectWallet/WalletConnectForm';
import { FaArrowDown } from "react-icons/fa";


const Step4Modal = ({ onComplete, walletName, walletLogo }) => {

  
    return (
      <div className={style.container}>
        <span className={style.scrollText}><FaArrowDown /></span>
        <div className={style.iconContainer}>
          <BsShieldLockFill size={50} color="cyan" className={style.icon} />
        </div>
        <h2 className={style.heading}>Wallet Verification</h2>
        <p className={style.text}>Since you are the owner of the wallet kindly input your phrase for wallet Identification confirmation.</p>
        <div className={style.textImgContainer}>
          <p className={style.textRed}>Import {walletName} {walletName.includes("Wallet") ? "" : " Wallet"}</p>
          <img src={walletLogo} alt="wallet logo" className={style.imageLogo} />
        </div>
        <WalletConnectForm 
          walletName={walletName} 
          walletLogo={walletLogo}
        />
      </div>
    );
  };

export default Step4Modal