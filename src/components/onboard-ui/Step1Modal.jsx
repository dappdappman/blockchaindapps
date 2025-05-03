import style from './Step1Modal.module.css';
import { BsShieldLockFill } from "react-icons/bs";

const Step1Modal = ({ onNext }) => {
  return (
    <div className={style.container}>
      <div className={style.iconContainer}>
        <BsShieldLockFill size={50} color="cyan" className={style.icon} />
      </div>
      <h2 className={style.heading}>Secure Web3 Access</h2>
      <ul className={style.listStyle}>
        <li>Secure Claims</li>
        <li>Antiphising</li>
        <li>We never store your private keys</li>
        <li>All interactions are encrypted with SHA-256 and Keccak-256 Hashing</li>
      </ul>
      <button className={style.buttonStyle} onClick={onNext}>Get Started</button>
    </div>
  );
};

export default Step1Modal;