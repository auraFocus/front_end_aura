import React,{useState} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../styles/login_page.css';
import Logo from '../../public/assets/logo.png'
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "./loader";



const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handlelogin = async (e) => {
        e.preventDefault();
        setLoading(true);


        const loginData = {
            username:username,
            password:password,
        }

        try {
            const response = await axios.post(
                "/aura/auth/",
                loginData,
                {
                    headers:{
                        "Content-Type":"application/json"
                    },
                }
            );

            console.log(response);
            
            if (response.data.token) {

                localStorage.setItem("token",response.data.token);

                navigate("/dashboard");
            }
        }catch(error){
            console.log(error);
            
            setErrorMessage("Login ou senha inválidos. Por favor, tente novamente.")
        } finally {
          setLoading(false);
        }
    };





    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
    return (
        <div className="login-form">

            <div className="logo">
                <img src={Logo} alt="AuraFocus Logo" />
            </div>



            <h2 className="label_input_login" >Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

          { loading ? (<Loader/>) : ( 
             <form onSubmit={handlelogin}>
       
        <div className="input-container">
          <input
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-container password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={togglePasswordVisibility} className="password-toggle">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

       
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
  )}
            <div className="forgot-password">
                <a href="/forgot-password">Esqueceu sua senha ?</a>
            </div>

            
         

        </div>
    );
};

export default LoginForm;
