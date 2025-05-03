import React, { useState } from 'react';
import style from './Step3Modal.module.css';
import { BsShieldLockFill } from "react-icons/bs";


const Step3Modal = ({ onNext }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [isOwner, setIsOwner] = useState(null);
  
    return (
      <div className={style.container}>
        <div className={style.iconContainer}>
          <BsShieldLockFill size={50} color="cyan" className={style.icon} />
        </div>
        <h2 className={style.heading}>Ownership Confirmation:</h2>
        <p className={style.text}>Input your wallet address (<strong>BTC</strong>, <strong>USDT</strong> <strong>TRC20</strong>, <strong>BEP20</strong>, <strong>ERC 20</strong>, <strong>ETH</strong> or a matching wallet)</p>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Paste wallet address"
          className={style.addressInput}
        />
        <p className={style.textRed}>Confirm if you are the rightful owner of this wallet</p>
        <div 
          className={style.buttonGroupStyle}
        >
          <button 
            className={
              isOwner === true
                ? style.optionSelectedButton
                : style.optionButton
            }
            onClick={() => setIsOwner(true)}
          >
            Yes, I am the owner
          </button>
          <button 
             className={
              isOwner === false
                ? style.optionSelectedButton
                : style.optionButton
            }
            onClick={() => setIsOwner(false)}
          >
            No I am not
          </button>
        </div>
        {isOwner === true && (
          <button
            className={style.buttonStyle} 
            onClick={() => onNext(walletAddress)}
            disabled={!walletAddress}
          >
            Continue Wallet Verification
          </button>
        )}
      </div>
    );
};

export default Step3Modal;