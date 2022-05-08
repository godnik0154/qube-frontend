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

  let [showLoader,setShowLoader] = React.useState(false);

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
    setShowLoader(true);
    const res = await axios.post(`${API_URL}/login`,userData);
    const data = res.data.data;
    setShowLoader(false);

    if(typeof data !== 'object') {
      toast.error(data);
    } else {
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


  function useOutsideAlerter(ref) {
    React.useEffect(() => {


      function loseFocus(e){
        let valid = false;

        if(ref.current.name==='password')
          valid = validPassword(ref.current.value);
        else
          valid = validEmail(ref.current.value);

        if(ref.current.value!=''){
          if(!valid) {
            ref.current.style.border = '2px solid #e74c3c';
            ref.current.nextElementSibling.style.color = '#e74c3c';
            ref.current.nextElementSibling.nextElementSibling.style.display = 'flex';
            ref.current.nextElementSibling.nextElementSibling.style.color = '#e74c3c';
            if(ref.current.name==='password')
              ref.current.nextElementSibling.nextElementSibling.childNodes[1].textContent = 'Please enter at least 6 characters including a letter and a number';
            else 
              ref.current.nextElementSibling.nextElementSibling.childNodes[1].textContent = 'Please enter a email';
          } else {
            // ref.current.style.border = '2px solid #4BB543';
            // ref.current.nextElementSibling.style.color = '#4BB543';
            // ref.current.nextElementSibling.nextElementSibling.style.display = 'flex';
            // ref.current.nextElementSibling.nextElementSibling.style.color = '#4BB543';
            if(ref.current.name==='password')
              ref.current.nextElementSibling.nextElementSibling.childNodes[1].textContent = 'Entered password is valid';
            else 
              ref.current.nextElementSibling.nextElementSibling.childNodes[1].textContent = 'Entered email is valid';
          }
        } else {
          ref.current.style.border = '2px solid #dadce0';
          ref.current.nextElementSibling.nextElementSibling.style.display = 'none';
          ref.current.nextElementSibling.style.color = '#cccac8';
        }
      }

      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {

          let valid = false;

          if(ref.current.name==='password')
            valid = validPassword(ref.current.value);
          else
            valid = validEmail(ref.current.value);

          if(ref.current.value!=''){
            if(!valid) {
              ref.current.style.border = '2px solid #e74c3c';
              ref.current.nextElementSibling.style.color = '#e74c3c';
              ref.current.nextElementSibling.nextElementSibling.style.display = 'flex';
              ref.current.nextElementSibling.nextElementSibling.style.color = '#e74c3c';
              if(ref.current.name==='password')
                ref.current.nextElementSibling.nextElementSibling.childNodes[1].textContent = 'Please enter at least 6 characters including a letter and a number';
              else 
                ref.current.nextElementSibling.nextElementSibling.childNodes[1].textContent = 'Please enter a email';
            } else {
              // ref.current.style.border = '2px solid #4BB543';
              // ref.current.nextElementSibling.style.color = '#4BB543';
              // ref.current.nextElementSibling.nextElementSibling.style.display = 'flex';
              // ref.current.nextElementSibling.nextElementSibling.style.color = '#4BB543';
              if(ref.current.name==='password')
                ref.current.nextElementSibling.nextElementSibling.childNodes[1].textContent = 'Entered password is valid';
              else 
                ref.current.nextElementSibling.nextElementSibling.childNodes[1].textContent = 'Entered email is valid';
            }
          } else {
            ref.current.style.border = '2px solid #dadce0';
            ref.current.nextElementSibling.nextElementSibling.style.display = 'none';
            ref.current.nextElementSibling.style.color = '#cccac8';
          }
        }
      }

      let handleFocus = (e) => {
        ref.current.style.border = '2px solid royalblue';
        ref.current.nextElementSibling.style.color = 'royalblue';
        ref.current.nextElementSibling.nextElementSibling.style.display = 'none';
      }

      ref.current.addEventListener('keydown',e=>{
        if(e.keyCode===9){
          loseFocus(e);
        }
      })

      document.addEventListener("mousedown", handleClickOutside);
      ref.current.addEventListener('focus',handleFocus);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        ref.current?.removeEventListener('focus',handleFocus);
      };
    }, [ref]);
  }

  const emailRef = React.useRef(null);
  useOutsideAlerter(emailRef);
  const passwordRef = React.useRef(null);
  useOutsideAlerter(passwordRef);

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
                ref = {emailRef}
                type="email"
                className="login-material-input"
                name="email"
                autoComplete="off"
                required
                value={userData.email}
                onChange={e=>handleChange("email",e.target.value)}
              />
              <label htmlFor="inputField" className={`login-material-input-label ${userData.email !==''?'login-material-input-label-inval':'login-material-input-label-val'}`}>
                Email
              </label>
              <div className="login-invalid-feedback">
                <i className="fa-regular fa-circle-info"></i>
                <p className="login-invalid-feedback-text">Please enter a valid email</p>
              </div>
            </div>
            <div style={{ marginTop: '2rem' }} />
            <div className="login-material-input-parent">
              <input
                ref = {passwordRef}
                type="password"
                autoComplete="off"
                name="password"
                className="login-material-input"
                required
                value={userData.password}
                onChange={e=>handleChange("password",e.target.value)}
              />
              <label htmlFor="inputField" className={`login-material-input-label ${userData.password !==''?'login-material-input-label-inval':'login-material-input-label-val'}`}>
                Password
              </label>
              <div className="login-invalid-feedback">
                <i className="fa-regular fa-circle-info"></i>
                <p className="login-invalid-feedback-text">Please enter at least 6 characters including a letter and a number</p>
              </div>
            </div>
            <p className="login-material-input-helper">
              &nbsp;&nbsp;At least 6 characters and should include a letter and a
              number
            </p>
          </div>
          <div className="login-submit-area">
            <button disabled={errors.email || errors.password} style={errors.email || errors.password?{cursor:"not-allowed"}:{cursor:"pointer"}} onClick={handleClick} className="login-submit-btn">
              {showLoader?<div className="login-loader-cont">
                <div className="login-loader-elmn"></div>
              </div>:<>Continue with email</>}
            </button>
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
