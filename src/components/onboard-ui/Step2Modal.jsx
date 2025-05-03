import { useState } from 'react';
import style from './Step2Modal.module.css';
import { BsShieldLockFill } from "react-icons/bs";

const Step2Modal = ({ onNext }) => {

    const [selectedUserType, setSelectedUserType] = useState(null);
  
    return (
      <div className={style.container}>
        <div className={style.iconContainer}>
          <BsShieldLockFill size={50} color="cyan" className={style.icon} />
        </div>
        <h2 className={style.heading}>Select User Type</h2>
        <div className={style.buttonGroupStyle}>
          <button
            className={
              selectedUserType === 'individual'
                ? style.optionSelectedButton
                : style.optionButton
            }
            onClick={() => setSelectedUserType('individual')}
          >
            Individual
          </button>
          <button 
            className={
              selectedUserType === 'organization'
                ? style.optionSelectedButton
                : style.optionButton
            }
            // className={style.selectedUserType === 'organization' ? selectedButtonStyle : buttonStyle}
            onClick={() => setSelectedUserType('organization')}
          >
            Organization
          </button>
          <button 
            className={
              selectedUserType === 'validator'
                ? style.optionSelectedButton
                : style.optionButton
            }
            onClick={() => setSelectedUserType('validator')}
          >
            Validator
          </button>
        </div>
        <p className={style.text}>
          Ensure you are using a secure device
        </p>
        {selectedUserType && <button 
          className={style.buttonStyle} 
          onClick={() => onNext(selectedUserType)}
          disabled={!selectedUserType}
        >
          Proceed
        </button>}
      </div>
    );
  };

export default Step2Modal;