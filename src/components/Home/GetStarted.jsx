import React from 'react';
import style from './GetStarted.module.css';

const GetStarted = () => {
  return (
    <section className={style.getStartedSection}>
      <div className={style.getStartedContainer}>
        <h2 className={style.getStartedHeading}>
          Start in <span>3 Easy Steps</span>
        </h2>
        <article className={style.getStartedArticle}>
          <div className={style.getStarted}>
            <div>
              <span>1</span>
            </div>
            <div>
              <h3>Choose Your Wallet</h3>
              <p>Browse our supported wallet options and select the one you’d like to sync, validate, restore, or troubleshoot.</p>
            </div>
          </div>

          <div className={style.getStarted}>
            <div>
              <span>2</span>
            </div>
            <div>
              <h3>Verify Wallet Details</h3>
              <p>Authenticate the wallet you'd like to connect. All private keys remain local to your device, keeping your assets safe.</p>
            </div>
          </div>

          <div className={style.getStarted}>
            <div>
              <span>3</span>
            </div>
            <div>
              <h3>Securely Connect</h3>
              <p>Establish a secure connection using end-to-end encryption. Your actions stay private and protected at all times.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default GetStarted;
