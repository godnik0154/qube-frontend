import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/user/user.action';

function validEmail(e) {
  var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(e).search (filter) != -1;
}

function validPassword(e) {
  return /\d/.test(e) && e.length >= 6;
}

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(state=>state.user.user);

  if(data.isCompleted !== undefined){
    if(data.isCompleted){
      navigate('/dashboard');
    }
    else{
      navigate('/onboarding');
    }
  }


  let [userData, setUserData] = React.useState({
    email: "",
    password: ""
  });

  let [errors, setErrors] = React.useState({
    email: true,
    password: true
  });

  React.useEffect(() => {
    let cast = {};
    cast.email = !validEmail(userData.email);
    cast.password = !validPassword(userData.password);

    setErrors(cast);

  },[userData]);

  let handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value
    });
  }

  let handleClick = async (e) => {
    const res = await axios.post(`${API_URL}/login`,userData);
    const data = res.data.data;

    if(typeof data !== 'object') {
      toast.error(data);
    } else {
      toast.success("Login Successfully");
      delete data._id;
      dispatch(setUserDetails(data));

      if(data.isCompleted){
        navigate('/dashboard');
      }
      else{
        navigate('/onboarding');
      }
    }
  }


  return (
    <>
      <div className="login-page">
        <div className="login-logo-cont">
          <img src="/images/Qube.svg" className="login-logo" alt="logo" />
        </div>
        <div className="login-image-cont">
          <img
            src="/images/Ellipse.png"
            className="login-image"
            alt="login image"
          />
        </div>
        <div className="container login-container">
          <h1 className="login-cont-heading">Welcome Back</h1>
          <div className="login-google-btn">
            <div className="login-google-icon-wrapper">
              <img className="login-google-icon" src="/images/google-logo.svg" />
            </div>
            <p className="login-google-btn-text">Continue with Google</p>
          </div>
          <p className="login-divider">or</p>
          <div className="login-form-area">
            <div className="login-material-input-parent">
              <input
                type="email"
                className="login-material-input"
                name="email"
                required
                value={userData.email}
                onChange={e=>handleChange("email",e.target.value)}
                style = {userData.email !== '' ?{border: errors.email?"2px solid #e74c3c":"2px solid #4BB543"}:{}}
              />
              <label htmlFor="inputField" className="login-material-input-label" style = {userData.email?{color: errors.email?"#e74c3c":"#4BB543"}:{}}>
                Email
              </label>
            </div>
            <div style={{ marginTop: '2rem' }} />
            <div className="login-material-input-parent">
              <input
                type="password"
                name="password"
                className="login-material-input"
                required
                value={userData.password}
                onChange={e=>handleChange("password",e.target.value)}
                style = {userData.password !== ''?{border: errors.password?"2px solid #e74c3c":"2px solid #4BB543"}:{}}
              />
              <label htmlFor="inputField" className="login-material-input-label" style = {userData.password?{color: errors.password?"#e74c3c":"#4BB543"}:{}}>
                Password
              </label>
            </div>
            <p className="login-material-input-helper">
              &nbsp;&nbsp;At least 6 characters and should include a letter and a
              number
            </p>
          </div>
          <div className="login-submit-area">
            <button disabled={errors.email || errors.password} style={errors.email || errors.password?{cursor:"not-allowed", opacity:'.8'}:{cursor:"pointer"}} onClick={handleClick} className="login-submit-btn">Continue with email</button>
            <div className="login-small-help">
              Don't have an account yet?{' '}
              <Link to="/signup">Create a new account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
