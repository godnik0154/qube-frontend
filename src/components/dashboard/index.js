import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

import Sidebar from '../helper/sidebar'
import { resetUserDetails } from '../../redux/user/user.action';
import Home from './home';
import './style.css';
import Profile from './profile';

function Dashboard() {
  const [logoutAct,setLogoutAct] = React.useState(false);
  const [sidebarOpen,setSidebarOpen] = React.useState(false);
  const [page, setPage]= React.useState('home');

  const handleLogChange = (e) => {
    setLogoutAct(!logoutAct);
  }

  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user);


  const profilePicName = user.profile.name;

  React.useEffect(()=>{
    document.querySelectorAll(".dashboard-sidebar-item").forEach(key=>{
      key.addEventListener("click",e=>{
        document.querySelectorAll(".dashboard-sidebar-item").forEach(item=>{
          item.classList.remove('active');
        });

        key.classList.add('active');
        setPage(key.childNodes[1].textContent.toLowerCase());
      })
    })
  },[])


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

  const handleSidebarOpen = (e) => {
    setSidebarOpen(!sidebarOpen);
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
                <div className='dashboard-sidebar-acc'>Account</div>
                <div className='dashboard-sidebar-hr'></div>
                <li className="dashboard-sidebar-item">
                  <i className="fa-light fa-wallet dashboard-sidebar-item-icon"></i>
                  <p className="dashboard-sidebar-item-info">Payments</p>
                </li>
                <li className="dashboard-sidebar-item">
                  <i className="fa-light fa-user dashboard-sidebar-item-icon"></i>
                  <p className="dashboard-sidebar-item-info">Profile</p>
                </li>
                <li className="dashboard-sidebar-item">
                  <i className="fa-light fa-gear dashboard-sidebar-item-icon"></i>
                  <p className="dashboard-sidebar-item-info">Settings</p>
                </li>
                <div className="dashboard-sidebar-nah">
                  <i className="fa-light fa-user-headset dashboard-sidebar-nah-icon"></i>
                  <p className="dashboard-sidebar-nah-info">Get support</p>
                </div>
              </> : <>
                <li className="dashboard-sidebar-item" onClick={handleSidebarOpen}>
                  <i className="fa-light fa-user dashboard-sidebar-item-icon"></i>
                  <p className="dashboard-sidebar-item-info">Account</p>
                </li>
              </>
            }
          </ul>
        </div>
        <div className="dashboard-maincontent" style={sidebarOpen?{display:'none'}:{}}>
        {
          page==="home"?
          <Home
            profilePicName={profilePicName}
            firstName = {user.firstName}
            lastName = {user.lastName}
            handleLogChange={handleLogChange}
            logoutAct={logoutAct}
            handleLogOutClick={handleLogOutClick}
            brandName={user.brand.replaceAll(' ','_')}
          />:page==="profile"?<Profile
            firstName = {user.firstName}
            lastName = {user.lastName}
            email={user.email}
            gender={user.gender}
            dob={user.dob}
            profilePicName={profilePicName}
            handleLogOutClick={handleLogOutClick}
            handleLogChange={handleLogChange}
            logoutAct={logoutAct}
            emailValid={user.emailValid}
            phoneValid={user.phoneValid}
          />:<>Under Construction</>
        }
        </div>
        <Sidebar
          open={sidebarOpen}
        >
          <div className='sidebar-dashboard'>
            <div className='sidebar-dashboard-header'>
              <div className="sidebar-dashboard-logo-cont">
                <img src="/images/Qube.svg" className="sidebar-dashboard-logo" alt="logo" />
              </div>
              <div className='sidebar-dashboard-closed' onClick={handleSidebarOpen}>
                <i className="fa-thin fa-xmark"></i>
              </div>
            </div>
            <ul className='sidebar-dashboard-list'>
              <li className="sidebar-dashboard-item">
                <i className="fa-light fa-wallet sidebar-dashboard-item-icon"></i>
                <p className="sidebar-dashboard-item-info">Payments</p>
                <i className="fa-light fa-chevron-right sidebar-dahboard-item-go"></i>
              </li>
              <li className="sidebar-dashboard-item">
                <i className="fa-light fa-user sidebar-dashboard-item-icon"></i>
                <p className="sidebar-dashboard-item-info">Profile</p>
                <i className="fa-light fa-chevron-right sidebar-dahboard-item-go"></i>
              </li>
              <li className="sidebar-dashboard-item">
                <i className="fa-light fa-gear sidebar-dashboard-item-icon"></i>
                <p className="sidebar-dashboard-item-info">Settings</p>
                <i className="fa-light fa-chevron-right sidebar-dahboard-item-go"></i>
              </li>
            </ul>
            <div className='sidebar-dashboard-hr'></div>
            <div className="sidebar-dashboard-nah">
              <i className="fa-light fa-user-headset sidebar-dashboard-nah-icon"></i>
              <p className="sidebar-dashboard-nah-info">Get support</p>
            </div>
            <div className="sidebar-dashboard-logout" onClick={handleLogOutClick}>
              <i className="fa-light fa-arrow-right-from-bracket sidebar-dashboard-logout-icon"></i>
              <p className="sidebar-dashboard-logout-info">Signout</p>
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
}

export default Dashboard; 