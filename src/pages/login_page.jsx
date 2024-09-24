import React, { useState } from 'react';
import '../styles/login_page.css';
import  Loginform from '../components/login_form'
import Footer from '../components/footer'
import Logo from '../../public/assets/logo.png'


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="logo">
        <img src={Logo} alt="AuraFocus Logo" />
      </div>
        <Loginform/>
        <Footer/>
    </div>
  );
};

export default LoginPage;
