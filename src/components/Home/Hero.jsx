import React from 'react';
import style from './Hero.module.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    navigate('/ecosystem');
  };

  return (
    <section className={style.heroSection}>
      <article className={style.heroArticle}>
        <h1 className={style.heroTitle}>
          Effortlessly Link Mobile <span>Wallets with DApps</span>
        </h1>
        <p className={style.heroDescription}>
          BlockchainDapps is a blockchain protocol designed to bridge mobile crypto wallets and decentralized applications, 
          enabling secure and seamless Web3 interactions.
        </p>
        <button 
          className={style["connect-button"]} 
          onClick={handleConnectClick}
        >
          Connect
        </button>
      </article>
    </section>
  );
};

export default Hero;
