import React from 'react';
import styles from './Footer.module.css';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { RiTwitterXFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.section}>
        <div className={styles.iconsContainer}>
          <span className={styles.icon}><BsDiscord /></span>
          <span className={styles.icon}><RiTwitterXFill /></span>
          <span className={styles.icon}><BsGithub /></span>
        </div>
        <div className={styles.copyright}>
          <p>&copy;{new Date().getFullYear()} BlockchainDapps</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
