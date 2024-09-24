import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../styles/login_page.css';

const LoginForm = ({ showPassword, togglePasswordVisibility }) => {
    return (
        <div className="login-form">
            <h2>Login</h2>

            {/* Email Field */}
            <div className="input-container">
                <input type="email" placeholder="Enter your Email" required />
            </div>

            {/* Password Field */}
            <div className="input-container password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your Password"
                    required
                />
                <span onClick={togglePasswordVisibility} className="password-toggle">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password">
                <a href="/forgot-password">Esqueceu sua senha ?</a>
            </div>

            {/* Login Button */}
            <button className="login-btn">Login</button>

        </div>
    );
};

export default LoginForm;
