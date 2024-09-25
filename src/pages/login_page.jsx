import React, { useState } from 'react';
import '../styles/login_page.css';
import  Loginform from '../components/login_form'
import Footer from '../components/footer'



const LoginPage = () => {
  

  return (
    <div className="login-page">
      
        <Loginform/>
        <Footer/>
    </div>
  );
};

export default LoginPage;
