import React, { useState } from 'react';
import Step1Modal from '../components/onboard-ui/Step1Modal';
import Step2Modal from '../components/onboard-ui/Step2Modal';
import Step3Modal from '../components/onboard-ui/Step3Modal';
import Step4Modal from '../components/onboard-ui/Step4Modal';
import style from './Onboardscreens.module.css'

const Onboardscreens = ({ walletName, walletLogo }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userType, setUserType] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
  
    const handleStep1Complete = () => {
      setCurrentStep(2);
    };
  
    const handleStep2Complete = (selectedType) => {
      setUserType(selectedType);
      setCurrentStep(3);
    };
  
    const handleStep3Complete = (address) => {
      setWalletAddress(address);
      setCurrentStep(4);
    };
  
    const handleStep4Complete = (phrase) => {
      console.log('Process completed with:', { userType, walletAddress, phrase });
      
      alert('Verification process completed successfully!');
    };
  
    return (
      <div className={style.onboardContainer}>
        {currentStep === 1 && <Step1Modal onNext={handleStep1Complete} />}
        {currentStep === 2 && <Step2Modal onNext={handleStep2Complete} />}
        {currentStep === 3 && <Step3Modal onNext={handleStep3Complete} />}
        {currentStep === 4 && <Step4Modal onComplete={handleStep4Complete} walletName={walletName} walletLogo={walletLogo} />}
      </div>
    );
  };

export default Onboardscreens