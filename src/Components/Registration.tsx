import logo from '/logo.png';
import { useNavigate } from 'react-router-dom';
import  { Link }  from 'react-router-dom';
import { comparePasswords, registerUser } from '../utils/AuthUtils';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext'
import { useLocation } from "react-router-dom";

// TypeScript declaration for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render?: (container: string | HTMLElement, parameters: any) => number;
    };
  }
}

export default function Registration() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const responseError = params.get("error");

    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

    const { setUser } = useUser();
    const navigate = useNavigate();

    const RECAPTCHA_SITE_KEY = String(import.meta.env.VITE_RECAPTCHA_SITE_KEY);
    const GOOGLE_CLIENT_ID = String(import.meta.env.VITE_GOOGLE_CLIENT_ID);
    const GITHUB_CLIENT_ID = String(import.meta.env.VITE_GITHUB_CLIENT_ID);

    useEffect(() => {

        const checkRecaptcha = () => {
            if (window.grecaptcha && window.grecaptcha.ready) {
                window.grecaptcha.ready(() => {
                    setIsRecaptchaReady(true);
                });
            } else {
                setTimeout(checkRecaptcha, 100);
            }
        };

        checkRecaptcha();

    }, []);

    useEffect(() => {
        if (!responseError) return;

        switch (responseError) {
            case 'missing_code':
                setError('Missing authorization code from Google.');
                break;
            case 'token_exchange_failed':
                setError('Unable to exchange authorization code for tokens.');
                break;
            case 'invalid_access_token':
                setError('Invalid access token received from Google.');
                break;
            case 'invalid_id_token':
                setError('Invalid ID token received from Google.');
                break;
            case 'failed_to_fetch_user_info':
                setError('Unable to fetch user information from Google.');
                break;
            case 'email_not_verified':
                setError('Your Google account email is not verified.');
                break;
            case 'use_different_login_method':
                setError('Please log in using the method you originally signed up with.');
                break;
            case 'server_error':
                setError('A server error occurred. Please try again later.');
                break;
            case 'no_primary_email':
                setError('An error occurred with your github email. Please try different method.');
                break;
            default:
                setError('An unknown error occurred. Please try again.');
                break;
        }
    }, [error]);

    function handleShowPassword() {
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const showIcon = document.getElementById('toggleShow') as HTMLElement;

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showIcon.classList.remove('bx-show');
            showIcon.classList.add('bx-hide');
        } else {
            passwordInput.type = 'password';
            showIcon.classList.remove('bx-hide');
            showIcon.classList.add('bx-show');
        }
    }

    function handleShowConfirmPassword() {
        const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
        const showIcon = document.getElementById('toggleShowConfirm') as HTMLElement;

        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            showIcon.classList.remove('bx-show');
            showIcon.classList.add('bx-hide');
        } else {
            confirmPasswordInput.type = 'password';
            showIcon.classList.remove('bx-hide');
            showIcon.classList.add('bx-show');
        }
    }

    async function executeRecaptcha(): Promise<string> {
        return new Promise((resolve, reject) => {

            if (!window.grecaptcha || !isRecaptchaReady) {
                reject(new Error('reCAPTCHA not ready'));
                return;
            }

             try {
                window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'register' })
                    .then((token: string) => {
                        resolve(token);
                    })
                    .catch((error: any) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    async function handleGoogleLogin() {
        if (isGoogleLoading) return;
        setIsGoogleLoading(true);

        if (RECAPTCHA_SITE_KEY === 'undefined' || GOOGLE_CLIENT_ID === 'undefined') {
            console.error('Google Client ID or reCAPTCHA Site Key is not defined.');
            setError('Configuration error. Please try again later.');
            setIsGoogleLoading(false);
            return;
        }

        const recaptchaToken = await executeRecaptcha();

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-recaptcha`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                recaptchaToken:  recaptchaToken
            }),
        });

        if (!response.ok) {
            setError("Something went wrong");
            return;
        }

        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login-with-google`;
    }

    async function handleGithubLogin() {
        if (isGithubLoading) return;
        setIsGithubLoading(true);

        if (RECAPTCHA_SITE_KEY === 'undefined' || GITHUB_CLIENT_ID === 'undefined') {
            console.error('Github Client ID or reCAPTCHA Site Key is not defined.');
            setError('Configuration error. Please try again later.');
            setIsGithubLoading(false);
            return;
        }

        const recaptchaToken = await executeRecaptcha();

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-recaptcha`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                recaptchaToken:  recaptchaToken
            }),
        });

        if (!response.ok) {
            setError("Something went wrong");
            return;
        }

        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login-with-github`;
    }

    async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        setError('');
        setEmailError('');
        setPasswordError('');
        setUsernameError('');

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get('confirm-password') as string;

        if (!comparePasswords(password, confirmPassword)) {
            setPasswordError("Passwords are different!");
            setIsSubmitting(false);
            return;
        }

        try {

            const recaptchaToken = await executeRecaptcha();
            const userData = await registerUser(username, email, password, recaptchaToken);

            if (userData.error === true) {
                switch(userData.message) {
                    case 'reCAPTCHA verification failed':
                        setError('Security verification failed. Please try again.');
                        break;
                    case 'Validation failed':
                        setError(userData.errors ? userData.errors[0] : "Validation Error");
                        break;
                    case 'User with this email already exists!':
                        setEmailError('User with this email already exists!');
                        break;
                    case 'User with this username already exists!': 
                        setUsernameError('User with this username already exists!');
                        break;
                    case 'Failed to register user':
                        setError("Failed to register user");
                        break;
                    case 'User already exists!':
                        setError('User already exists!');
                        break;
                    case 'Internal server error':
                        setError("Something went wrong!");
                        break;
                    case 'reCAPTCHA token missing':
                        setError('Security verification failed. Please refresh the page and try again.');
                        break;   
                    default:
                        setError(userData.message);
                }
                setIsSubmitting(false);
                return;
            }
            if (userData.error === false && userData.user) {
                setUser(userData.user);
                navigate(`/user/${userData.user.public_id}/verifyEmail`);
            }
        } catch(error) {
            console.error('reCAPTCHA error:', error);
            setError('Security verification failed. Please refresh the page and try again.');
            setIsSubmitting(false);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white relative max-w-6xl mx-auto p-3 sm:p-5 pt-15">
            <header className="flex justify-between items-center w-full mb-10 md:mb-15 absolute top-0 left-0 right-0 py-3">
                <div className="flex items-center space-x-1">
                    <img src={logo} alt="Lexiqo logo" width={45}/>
                    <h1 className="font-bold text-[1.2rem]">Lexiqo</h1>
                </div>
                <button className="bg-white px-4 cursor-pointer hover:bg-gray-100 active:bg-gray-200 py-2 rounded transition-colors text-sm" onClick={() => navigate('/')}>
                    <i className='bx bx-left-arrow-alt text-lg translate-y-[0.2rem] -translate-x-2'></i> Back to Home
                </button>
            </header>
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg px-3 sm:px-8 py-5 flex flex-col items-center mt-0">
                <h2 className="text-2xl font-bold text-center mb-3">Create Account</h2>
                <p className="text-center text-sm text-gray-500">Join thousands of learners and start your journey</p>
                <button 
                    className={`w-full text-black py-3 px-4 rounded-lg mt-5 flex items-center justify-center border-[rgba(51,51,51,20%)] border transition-colors text-sm font-medium cursor-pointer ${
                        isGoogleLoading 
                            ? 'bg-gray-100 cursor-not-allowed' 
                            : 'bg-white hover:bg-gray-100 active:bg-gray-100'
                    }`}
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                >
                    {isGoogleLoading ? (
                        <>
                            <i className='bx bx-loader-alt bx-spin mr-2 text-xl'></i>
                            Signing in with Google...
                        </>
                    ) : (
                        <>
                            <i className='bx bxl-google text-xl mr-2'></i>
                            Continue with Google
                        </>
                    )}
                </button>
                <button 
                    className={`w-full text-black py-3 px-4 rounded-lg mt-5 flex items-center justify-center border-[rgba(51,51,51,20%)] border transition-colors text-sm font-medium cursor-pointer ${
                        isGithubLoading 
                            ? 'bg-gray-100 cursor-not-allowed' 
                            : 'bg-white hover:bg-gray-100 active:bg-gray-100'
                    }`}
                    onClick={handleGithubLogin}
                    disabled={isGithubLoading}
                >
                    {isGithubLoading ? (
                        <>
                            <i className='bx bx-loader-alt bx-spin mr-2 text-xl'></i>
                            Signing in with Github...
                        </>
                    ) : (
                        <>
                            <i className='bx bxl-github text-xl mr-2' ></i> Continue with GitHub
                        </>
                    )}
                </button>
                <div className="w-full mt-10 h-1 border-t border-gray-300 relative">
                    <span className="absolute left-1/2 transform whitespace-nowrap -translate-x-1/2 -top-2 bg-white px-3 text-gray-500 text-xs">OR CREATE WITH EMAIL</span>
                </div>
                <form className="w-full mt-10 flex flex-col space-y-5" onSubmit={(event) => handleSubmitForm(event)}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Username</label>
                        <div className="relative">
                            <input type="text" id="name" name="username" className="w-full border border-[rgba(51,51,51,20%)] outline-0 py-3 px-10 text-sm rounded-lg" placeholder="Enter your username" required/>
                            <i className='bx bx-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg'></i>
                        </div>
                        {usernameError && <p className="text-sm text-red-600">{usernameError}</p>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email address</label>
                        <div className="relative">
                            <input type="email" id="email" name="email" className="w-full border border-[rgba(51,51,51,20%)] outline-0 py-3 px-10 text-sm rounded-lg" placeholder="Enter your email" required/>
                            <i className='bx bx-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg'></i>
                        </div>
                        {emailError && <p className="text-sm text-red-600">{emailError}</p>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <input type="password" name="password" id="password" className="w-full border border-[rgba(51,51,51,20%)] outline-0 py-3 px-10 text-sm rounded-lg" placeholder="Enter your password" required/>
                            <i className='bx bx-lock-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg' ></i>
                            <i id="toggleShow" className='bx bx-show absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-lg' onClick={handleShowPassword}></i>
                        </div>
                        {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">Confirm password</label>
                        <div className="relative">
                            <input type="password" name="confirm-password" id="confirm-password" className="w-full border border-[rgba(51,51,51,20%)] outline-0 py-3 px-10 text-sm rounded-lg" placeholder="Confirm your password" required/>
                            <i className='bx bx-lock-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg' ></i>
                            <i id="toggleShowConfirm" className='bx bx-show absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-lg' onClick={handleShowConfirmPassword}></i>
                        </div>
                        {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                    </div>
                    <div className="flex w-full align-start gap-3">
                        <input type="checkbox" className="accent-[rgb(100,26,230)] w-4 cursor-pointer" required/>
                        <p className="text-sm text-gray-500">I agree to the <span className="text-brand">Terms of Service</span> and <span className="text-brand">Privacy Policy</span></p>
                    </div>
                    {/* reCAPTCHA notice */}
                    <div className="text-xs text-gray-400 text-center mt-2">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a href="https://policies.google.com/privacy" className="text-brand">Privacy Policy</a> and{' '}
                        <a href="https://policies.google.com/terms" className="text-brand">Terms of Service</a> apply.
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={!isRecaptchaReady || isSubmitting}
                        className={`w-full py-3 px-4 rounded-lg mt-2 transition-all text-sm font-medium cursor-pointer ${
                            !isRecaptchaReady || isSubmitting 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-brand text-white hover:opacity-90 active:opacity-80'
                        }`}
                    >
                        {isSubmitting ? (<><i className='bx bx-loader-alt bx-spin bx-rotate-90 mr-2' ></i>Creating Account...</>) : 'Create Your Account'}
                    </button>
                </form> 
                <p className="text-sm text-gray-500 mt-5">Already have an account? <Link to="/login" className="text-brand text-underline font-semibold">Sign in</Link></p> 
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}    
            </div>
        </div>
    );
}