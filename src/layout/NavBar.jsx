import style from './NavBar.module.css'; // Import your CSS module
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo/new-logo.png';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <header className={style["navigation-header"]}>
      <nav className={style["navigation"]}>
        <div className={style["logo"]}>
          <img src={Logo} alt="BlockchainDapps" className={style["wallet-logo"]}  />
          <span className={style["wallet-connect"]}>BlockchainDapps</span>
        </div>
        <div className={style["button-container"]}>
          <button
            onClick={() => navigate('/ecosystem')}
            className={style["connect-button"]}
          >
            Connect
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;