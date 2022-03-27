import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Personal from './personal';
import Homepage from './homepage';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserDetails } from '../../redux/user/user.action';

function Onboarding() {
  const [formStepsNum, setFormStepsNum] = React.useState(0);
  const [ctaActive,setCtaActive] = React.useState(false);

  const user = useSelector(state=>state.user.user);
  const [finalDataToBack,setFinalDataToBack] = React.useState({});
  const dispatch = useDispatch();

  const navigate = useNavigate();

  if(user.isCompleted !== undefined){
    if(user.isCompleted===true){
      navigate('/dashboard');
    }
  } else {
    navigate('/login');
  }

  let navigateToLogin = (e) => {
    dispatch(resetUserDetails());
    navigate('/login');
  }

  function updateFormSteps() {
    const formSteps = document.querySelectorAll('.onboarding-form-step');

    formSteps.forEach((formStep) => {
      formStep.classList.contains('onboarding-form-step-active') &&
        formStep.classList.remove('onboarding-form-step-active');
    });

    for (let i = 0; i < formStepsNum; i++) {
      formSteps[i].classList.add('onboarding-form-done');
      console.log(formSteps[i]);
    }

    formSteps[formStepsNum].classList.add('onboarding-form-step-active');
  }

  function updateProgressbar() {
    const progressSteps = document.querySelectorAll(
      '.onboarding-progress-step'
    );
    const progress = document.getElementById('progress');
    progressSteps.forEach((progressStep, idx) => {
      if (idx < formStepsNum + 1) {
        progressStep.classList.add('onboarding-progress-step-active');
      } else {
        progressStep.classList.remove('onboarding-progress-step-active');
      }
      progressStep.classList.remove('onboarding-progress-done');
    });

    const progressActive = document.querySelectorAll(
      '.onboarding-progress-step-active'
    );

    for (let i = 0; i < formStepsNum; i++) {
      progressSteps[i].classList.add('onboarding-progress-done');
      console.log(progressSteps[i]);
    }

    progress.style.width =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + '%';
  }

  let handlePostData = async (postData) => {
    postData.email = localStorage.getItem('email');
    const res = await axios.post(`${API_URL}/onboarding`,postData);
    const data = res.data.data;

    if(typeof data !== 'object') {
      toast.error(data);
    } else {
      toast.success("User Data Updated Successfully");
      console.log(data);
      Object.keys(data).forEach(
        (item) => {
          if(typeof data[item] === "object" && !Array.isArray(data[item])) data[item] = JSON.stringify(data[item]);
          localStorage.setItem(item, data[item]);
        }
      )

      navigate('/dashboard');
    }
  }


  React.useEffect(() => {
    updateFormSteps();
    updateProgressbar();
  }, [formStepsNum]);

  let handleNext = async (data) => {
    let postData = {...finalDataToBack,...data};
    setFinalDataToBack(postData)
    if(formStepsNum!=1)
      setFormStepsNum((prevState) => prevState + 1);
    else{
      handlePostData(postData);
    }
  };

  let handlePrev = (e) => {
    setFormStepsNum((prevState) => prevState - 1);
  };

  let handleCtaDown = (e) => {
    setCtaActive(!ctaActive);
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <div className="onboarding-logo-cont">
          <img src="/images/Qube.svg" className="onboarding-logo" alt="logo" />
        </div>
        <div className="onboarding-box-cont">
          <div className="onboarding-box-person">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="onboarding-box-dropdown" onClick={handleCtaDown}>
            <i className={`fa-solid ${ctaActive?"fa-angle-up":"fa-angle-down"}`}></i>
          </div>
        </div>
      </div>
      {ctaActive?<div className="onboarding-cta" onClick={navigateToLogin}>
        <div className="onbaording-cta-logo">
          <i className="fa-regular fa-arrow-right-from-bracket"></i>
        </div>
        <div className="onbaording-cta-text">
          Logout
        </div>
      </div>:null}
      <div className="container onboarding-container">
        <div className="onboarding-progress-bar">
          <div className="onboarding-progress" id="progress"></div>
          <div
            className="onboarding-progress-step onboarding-progress-step-active"
            data-title="Personal Details"
          >
            <i className="fa-regular fa-user"></i>
          </div>
          <div className="onboarding-progress-step" data-title="Homepage">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.775 2.15834L15.775 9.68334L18.4333 3.26667L15.775 2.15834ZM0.00835114 4.18334L5.40835 17.2167L14.6167 13.4083L9.21668 0.375005L0.00835114 4.18334ZM14.1 0.875004L11.225 0.875004L14.1 7.82501L14.1 0.875004Z"
                fill="#C4C4C4"
              />
            </svg>
          </div>
        </div>
        <div className="onboarding-form-step onboarding-form-step-active">
          <Personal handleNext={handleNext} finalDataToBack={finalDataToBack} />
        </div>
        <div className="onboarding-form-step">
          <Homepage handlePrev={handlePrev} handleNext={handleNext} />
        </div>
      </div>
    </div>
  );
}



export default Onboarding;
