import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { resetUserDetails } from '../../../redux/user/user.action';
import Pages from '../pages/index';
import './style.css';

let Dashboard = () => {

    const [logoutAct, setLogoutAct] = React.useState(false);

    const handleLogChange = (e) => {
        setLogoutAct(!logoutAct);
    }

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const firstName = user.firstName;
    const lastName = user.lastName;

    const navigate = useNavigate();

    if (user.isCompleted !== undefined) {
        if (user.isCompleted === false) {
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
        <div className='creator-dashboard-page'>
            <div className="creator-dashboard-sidebar">
                <div className="creator-dashboard-logo-cont">
                    <img src="/images/Qube.svg" className="creator-dashboard-logo" alt="logo" />
                </div>
                <ul className="creator-dashboard-sidebar-items-cont">
                    <li className="creator-dashboard-sidebar-item active">
                        <i className="fa-light fa-house-chimney creator-dashboard-sidebar-item-icon"></i>
                        <p className="creator-dashboard-sidebar-item-info">Home</p>
                    </li>
                    <li className="creator-dashboard-sidebar-item">
                        <i className="fa-light fa-cube creator-dashboard-sidebar-item-icon"></i>
                        <p className="creator-dashboard-sidebar-item-info">Products</p>
                    </li>
                    <li className="creator-dashboard-sidebar-item">
                        <i className="fa-light fa-layer-group creator-dashboard-sidebar-item-icon"></i>
                        <p className="creator-dashboard-sidebar-item-info">Services</p>
                    </li>
                    <li className="creator-dashboard-sidebar-item">
                        <i className="fa-light fa-browser creator-dashboard-sidebar-item-icon"></i>
                        <p className="creator-dashboard-sidebar-item-info">Pages</p>
                    </li>
                    {
                        window.screen.width < 500 ? <>
                            <li className="creator-dashboard-sidebar-item">
                                <i className="fa-light fa-ellipsis creator-dashboard-sidebar-item-icon"></i>
                                <p className="creator-dashboard-sidebar-item-info">More</p>
                            </li>
                        </> : <>
                            <li className="creator-dashboard-sidebar-item">
                                <i className="fa-light fa-users creator-dashboard-sidebar-item-icon"></i>
                                <p className="creator-dashboard-sidebar-item-info">Audience</p>
                            </li>
                            <li className="creator-dashboard-sidebar-item">
                                <i className="fa-light fa-signal-bars-good creator-dashboard-sidebar-item-icon"></i>
                                <p className="creator-dashboard-sidebar-item-info">Insights</p>
                            </li>
                            <li className="creator-dashboard-sidebar-item">
                                <i className="fa-light fa-wallet creator-dashboard-sidebar-item-icon"></i>
                                <p className="creator-dashboard-sidebar-item-info">Earnings</p>
                            </li>
                            <li className="creator-dashboard-sidebar-item">
                                <i className="fa-light fa-circle-user creator-dashboard-sidebar-item-icon"></i>
                                <p className="creator-dashboard-sidebar-item-info">Profile</p>
                            </li>
                            <li className="creator-dashboard-sidebar-item">
                                <i className="fa-light fa-gear creator-dashboard-sidebar-item-icon"></i>
                                <p className="creator-dashboard-sidebar-item-info">Settings</p>
                            </li>
                        </>
                    }
                </ul>
                {window.screen.width >= 500 ? <div className="creator-dashboard-sidebar-nah">
                    <i className="fa-light fa-user-headset creator-dashboard-sidebar-nah-icon"></i>
                    <p className="creator-dashboard-sidebar-nah-info">Get support</p>
                </div> : null}
            </div>
            <div className="dashboard-maincontent">
                <div className='creator-dashboard-maincontent-header'>
                    <div className="creator-dashboard-maincontent-header-name">
                        <p className='creator-dashboard-maincontent-header-name-greet'>Pages</p>
                    </div>
                    <div className="creator-dashboard-maincontent-header-cta">
                        <div className='creator-dashboard-maincontent-header-cta-btn'>
                            <div className='creator-dashboard-maincontent-header-cta-btn-name'>
                                {firstName} {lastName}
                            </div>
                            <div className='creator-dashboard-maincontent-header-cta-btn-icon' onClick={handleLogChange}>
                                <i className={`fa-light fa-angle-${logoutAct ? 'up' : 'down'}`}></i>
                            </div>
                        </div>
                        <div className={`creator-dashboard-maincontent-header-lgn-btn ${logoutAct ? 'closed' : ''}`} onClick={handleLogOutClick}>
                            <div className='creator-dashboard-maincontent-header-lgn-btn-icon'>
                                <i className="fa-light fa-arrow-right-from-bracket"></i>
                            </div>
                            <div className='creator-dashboard-maincontent-header-lgn-btn-name'>
                                Sign Out
                            </div>
                        </div>
                    </div>
                </div>
                <div className="creator-dashboard-maincontent-header-divider"/>
                <div className='creator-dashboard-maincontent-header-area'>
                    <Pages />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;