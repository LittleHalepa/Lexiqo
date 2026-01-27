import logo from '/logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginUser } from '../utils/AuthUtils';
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import { useLocation } from "react-router-dom";

export default function Login() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const error = params.get("error");

    const navigate = useNavigate();

    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordAndEmailError, setPasswordAndEmailError] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

    const { setUser } = useUser();

    const RECAPTCHA_SITE_KEY = String(import.meta.env.VITE_RECAPTCHA_SITE_KEY);
    const GOOGLE_CLIENT_ID = String(import.meta.env.VITE_GOOGLE_CLIENT_ID);
    const GITHUB_CLIENT_ID = String(import.meta.env.VITE_GITHUB_CLIENT_ID);

    useEffect(() => {
        if (!error) return;

        switch (error) {
            case 'missing_code':
                setGeneralError('Missing authorization code from Google.');
                break;
            case 'token_exchange_failed':
                setGeneralError('Unable to exchange authorization code for tokens.');
                break;
            case 'invalid_access_token':
                setGeneralError('Invalid access token received from Google.');
                break;
            case 'invalid_id_token':
                setGeneralError('Invalid ID token received from Google.');
                break;
            case 'failed_to_fetch_user_info':
                setGeneralError('Unable to fetch user information from Google.');
                break;
            case 'email_not_verified':
                setGeneralError('Your Google account email is not verified.');
                break;
            case 'use_different_login_method':
                setGeneralError('Please log in using the method you originally signed up with.');
                break;
            case 'server_error':
                setGeneralError('A server error occurred. Please try again later.');
                break;
            case 'no_primary_email':
                setGeneralError('An error occurred with your github email. Please try different method.');
                break;
            default:
                setGeneralError('An unknown error occurred. Please try again.');
                break;
        }
    }, [error]);

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

    async function handleGoogleLogin() {
        if (isGoogleLoading) return;
        setIsGoogleLoading(true);

        if (!RECAPTCHA_SITE_KEY || !GOOGLE_CLIENT_ID) {
            console.error('Google Client ID or reCAPTCHA Site Key is not defined.');
            setGeneralError('Configuration error. Please try again later.');
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
            setGeneralError("Something went wrong");
            return;
        }

        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login-with-google`;
    }

    async function handleGithubLogin() {
        if (isGithubLoading) return;
        setIsGithubLoading(true);

        if (RECAPTCHA_SITE_KEY === 'undefined' || GITHUB_CLIENT_ID === 'undefined') {
            console.error('Github Client ID or reCAPTCHA Site Key is not defined.');
            setGeneralError('Configuration error. Please try again later.');
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
            setGeneralError("Something went wrong");
            return;
        }

        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login-with-github`;
    }

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

    async function executeRecaptcha(): Promise<string> {
        return new Promise((resolve, reject) => {

            if (!window.grecaptcha || !isRecaptchaReady) {
                reject(new Error('reCAPTCHA not ready'));
                return;
            }

             try {
                window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'login' })
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


    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setPasswordAndEmailError(null);
        setGeneralError(null);

        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!isRecaptchaReady) {
            setGeneralError('reCAPTCHA is not ready. Please try again later.');
            setIsSubmitting(false);
            return;
        }

        const form = event.target as HTMLFormElement;

        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        try {
            const recaptchaToken = await executeRecaptcha();
            const userData = await loginUser(email, password, recaptchaToken);

            if (userData.error === false) {

                if (userData.message === 'Account not verified. Verification code sent to email.' && userData.user) {
                    navigate(`/user/${userData.user.public_id}/verifyEmail`);
                    setUser(userData.user);
                    return;
                }

                navigate(`/user/${userData.user.public_id}/dashboard/home`);
                setUser(userData.user);
                return;
            } else {
                switch (userData.message) {
                    case 'Invalid email or password.':
                        setPasswordAndEmailError('Invalid email or password.');
                        break;
                    case 'reCAPTCHA verification failed':
                        setGeneralError('reCAPTCHA verification failed. Please try again.');
                        break;
                    case 'Please log in using different method.':
                        setGeneralError('Please log in using the method you originally signed up with.');
                        break;
                    default:
                        setGeneralError('An error occurred during login. Please try again later.');
                        break;
                }
            return;
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Login error:", message);
        setGeneralError('An error occurred during login. Please try again later.');
        return;
    } finally {
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
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg px-3 sm:px-8 py-5 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-3">Sign In</h2>
                <p className="text-center text-sm text-gray-500">Access your account for more features</p>
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
                    <span className="absolute left-1/2 transform whitespace-nowrap -translate-x-1/2 -top-2 bg-white px-3 text-gray-500 text-xs">OR CONTINUE WITH EMAIL</span>
                </div>
                <form className="w-full mt-10 flex flex-col space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email address</label>
                        <div className="relative">
                            <input type="email" id="email" name='email' className="w-full border border-[rgba(51,51,51,20%)] outline-0 py-3 px-10 text-sm rounded-lg" placeholder="Enter your email" required/>
                            <i className='bx bx-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg'></i>
                        </div>
                        {passwordAndEmailError && <p className="text-red-500 text-sm mt-1">{passwordAndEmailError}</p>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <input type="password" name="password" id="password" className="w-full border border-[rgba(51,51,51,20%)] outline-0 py-3 px-10 text-sm rounded-lg" placeholder="Enter your password" required/>
                            <i className='bx bx-lock-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg' ></i>
                            <i id="toggleShow" className='bx bx-show absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-lg' onClick={handleShowPassword}></i>
                        </div>
                        {passwordAndEmailError && <p className="text-red-500 text-sm mt-1">{passwordAndEmailError}</p>}
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <input type="checkbox" className="translate-y-[0.1rem] accent-[rgb(100,26,230)] w-4"/>
                            <label htmlFor="remember" className="text-sm ml-2 text-gray-500">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-brand hover:underline">Forgot password?</a>
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
                        {isSubmitting ? (<><i className='bx bx-loader-alt bx-spin bx-rotate-90 mr-2' ></i>Signing you in...</>) : 'Login to Your Account'}
                    </button>
                </form> 
                {generalError && <p className="text-red-500 text-sm mt-3 text-center">{generalError}</p>}
                <p className="text-sm text-gray-500 mt-5">Don't have an account? <Link to="/register" className="text-brand text-underline font-semibold">Create one</Link></p>     
            </div>
        </div>
    );
}