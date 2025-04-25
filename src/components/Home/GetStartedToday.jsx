import styles from './GetStartedToday.module.css';
import { useNavigate } from 'react-router-dom';

const GetStartedToday = () => {
    const navigate = useNavigate();
  return (
    <section className={styles.section}>
        <h2 className={styles.heading}>Get Started with <span>BlockchainDapps</span></h2>
        <button
            onClick={() => navigate('/ecosystem')}
            className={styles["connect-button"]}
          >
            Connect
          </button>
    </section>
  );
};

export default GetStartedToday;