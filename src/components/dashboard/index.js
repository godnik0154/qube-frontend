import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { resetUserDetails } from '../../redux/user/user.action';
import './style.css';

function Dashboard() {

  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const profilePicName = JSON.parse(localStorage.getItem('profile')).name;

  const [logoutAct,setLogoutAct] = React.useState(false);

  const handleLogChange = (e) => {
    setLogoutAct(!logoutAct);
  }

  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user);

  const navigate = useNavigate();

  if(user.isCompleted !== undefined){
    if(user.isCompleted===false){
      navigate('/onboarding');
    }
  } else {
    navigate('/login');
  }

  const handleLogOutClick = (e) => {
    dispatch(resetUserDetails());
    navigate('/login');
  }

  return (
    <>
      <div className="dashboard-page">
        <div className="dashboard-sidebar">
          <div className="dashboard-logo-cont">
            <img src="/images/Qube.svg" className="dashboard-logo" alt="logo" />
          </div>
          <ul className="dashboard-sidebar-items-cont">
            <li className="dashboard-sidebar-item active">
              <i className="fa-light fa-house-chimney dashboard-sidebar-item-icon"></i>
              <p className="dashboard-sidebar-item-info">Home</p>
            </li>
            <li className="dashboard-sidebar-item">
              <i className="fa-light fa-cart-shopping dashboard-sidebar-item-icon"></i>
              <p className="dashboard-sidebar-item-info">Sell</p>
            </li>
            <li className="dashboard-sidebar-item">
              <i className="fa-light fa-layer-group dashboard-sidebar-item-icon"></i>
              <p className="dashboard-sidebar-item-info">Manage</p>
            </li>
            <li className="dashboard-sidebar-item">
              <i className="fa-light fa-browser dashboard-sidebar-item-icon"></i>
              <p className="dashboard-sidebar-item-info">Website</p>
            </li>
            {
              window.screen.width >= 500 ? <>
                <li className="dashboard-sidebar-item">
                  <i className="fa-light fa-user dashboard-sidebar-item-icon"></i>
                  <p className="dashboard-sidebar-item-info">Profile</p>
                </li>
                <li className="dashboard-sidebar-item">
                  <i className="fa-light fa-gear dashboard-sidebar-item-icon"></i>
                  <p className="dashboard-sidebar-item-info">Settings</p>
                </li>
              </> : <>
                <li className="dashboard-sidebar-item">
                  <i className="fa-light fa-user dashboard-sidebar-item-icon"></i>
                  <p className="dashboard-sidebar-item-info">Account</p>
                </li>
              </>
            }
          </ul>
          {window.screen.width >= 500 ? <div className="dashboard-sidebar-nah">
            <i className="fa-light fa-user-headset dashboard-sidebar-nah-icon"></i>
            <p className="dashboard-sidebar-nah-info">Get support</p>
          </div> : null}
        </div>
        <div className="dashboard-maincontent">
          <div className='dashboard-maincontent-header'>
            <div className="dashboard-maincontent-header-picture-box">
              <div className='dashboard-maincontent-header-picture' style={{backgroundImage: `url("${`${API_URL}/profile/getImage/${profilePicName}`}")`}} />
            </div>
            <div className="dashboard-maincontent-header-name">
              <p className='dashboard-maincontent-header-name-greet'>Welcome, <span>{firstName}</span></p>
            </div>
            {window.screen.width >= 500 ? <div className="dashboard-maincontent-header-cta">
              <div className='dashboard-maincontent-header-cta-btn'>
                <div className='dashboard-maincontent-header-cta-btn-name'>
                {firstName} {lastName}
                </div>
                <div className='dashboard-maincontent-header-cta-btn-icon' onClick={handleLogChange}>
                  <i className={`fa-light fa-angle-${logoutAct?'up':'down'}`}></i>
                </div>
              </div>
              <div className={`dashboard-maincontent-header-lgn-btn ${logoutAct?'closed':''}`} onClick={handleLogOutClick}>
                <div className='dashboard-maincontent-header-lgn-btn-icon'>
                  <i className="fa-light fa-arrow-right-from-bracket"></i>
                </div>
                <div className='dashboard-maincontent-header-lgn-btn-name'>
                  Sign Out
                </div>
              </div>
            </div> : null}
          </div>
          <div className="dashboard-maincontent-info-box row">
            <div className="col-md-6">
              <div className='dashboard-maincontent-info-box-mainbox'>
                <p className="dashboard-maincontent-info-box-mainbox-head">Share your website link</p>
                <p className="dashboard-maincontent-info-box-mainbox-subhead">Add store link to your social media bio. Let your audience discover your products, services and join your community from the link below</p>
                <div className="dashboard-maincontent-info-box-mainbox-link">
                  <div className="dashboard-maincontent-info-box-mainbox-link-box">
                    www.qube.so/{firstName}_{lastName}
                  </div>
                  <div className="dashboard-maincontent-info-box-mainbox-link-icon">
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.125 0.875H2.5C1.5375 0.875 0.75 1.6625 0.75 2.625V14C0.75 14.4812 1.14375 14.875 1.625 14.875C2.10625 14.875 2.5 14.4812 2.5 14V3.5C2.5 3.01875 2.89375 2.625 3.375 2.625H12.125C12.6062 2.625 13 2.23125 13 1.75C13 1.26875 12.6062 0.875 12.125 0.875ZM15.625 4.375H6C5.0375 4.375 4.25 5.1625 4.25 6.125V18.375C4.25 19.3375 5.0375 20.125 6 20.125H15.625C16.5875 20.125 17.375 19.3375 17.375 18.375V6.125C17.375 5.1625 16.5875 4.375 15.625 4.375ZM14.75 18.375H6.875C6.39375 18.375 6 17.9813 6 17.5V7C6 6.51875 6.39375 6.125 6.875 6.125H14.75C15.2312 6.125 15.625 6.51875 15.625 7V17.5C15.625 17.9813 15.2312 18.375 14.75 18.375Z" fill="#323232" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard; 