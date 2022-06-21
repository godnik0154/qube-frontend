import React from "react";
import "./style.css";
import { API_URL } from '../../config';
import { toast } from 'react-toastify';

let Home = ({
  profilePicName,
  firstName,
  lastName,
  handleLogChange,
  logoutAct,
  handleLogOutClick,
  brandName
}) => {

  const profileUrl = `https://my.qube.so/${brandName}`;

  const [tempProfile, setTempProfile] = React.useState(profileUrl);

  let handleChangeTempUrl = (e) => {
    setTempProfile(e.target.value);
  }

  const handleCopy = (e) => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile Url Copied");
  }

  let goToProfile = () => {
    window.open(profileUrl,'_blank')
  }

  return (
    <>
      <div className="dashboard-maincontent-header">
        <div className="dashboard-maincontent-header-picture-box">
          <div
            className="dashboard-maincontent-header-picture"
            style={{
              backgroundImage: `url("${`${API_URL}/profile/getImage/${profilePicName}`}")`,
            }}
          />
        </div>
        <div className="dashboard-maincontent-header-name">
          <p className="dashboard-maincontent-header-name-greet">
            Welcome, <span>{firstName}</span>
          </p>
        </div>
        {window.screen.width >= 500 ? (
          <div className="dashboard-maincontent-header-cta">
            <div className="dashboard-maincontent-header-cta-btn">
              <div className="dashboard-maincontent-header-cta-btn-name">
                {firstName} {lastName}
              </div>
              <div
                className="dashboard-maincontent-header-cta-btn-icon"
                onClick={handleLogChange}
              >
                <i
                  className={`fa-light fa-angle-${logoutAct ? "up" : "down"}`}
                ></i>
              </div>
            </div>
            <div
              className={`dashboard-maincontent-header-lgn-btn ${
                logoutAct ? "closed" : ""
              }`}
              onClick={handleLogOutClick}
            >
              <div className="dashboard-maincontent-header-lgn-btn-icon">
                <i className="fa-light fa-arrow-right-from-bracket"></i>
              </div>
              <div className="dashboard-maincontent-header-lgn-btn-name">
                Sign Out
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="dashboard-maincontent-info-other">
        <div className="dashboard-maincontent-info-box row">
          <div className="col-md-6">
            <div className="dashboard-maincontent-info-box-mainbox">
              <p className="dashboard-maincontent-info-box-mainbox-head">
                Share your website link
              </p>
              <p className="dashboard-maincontent-info-box-mainbox-subhead">
                Add store link to your social media bio. Let your audience
                discover your products, services and join your community from
                the link below
              </p>
              <div className="dashboard-maincontent-info-box-mainbox-link">
                <div
                  onClick={goToProfile}
                  className="dashboard-maincontent-info-box-mainbox-link-box"
                  title={profileUrl}
                >
                  <input
                    className="dashboard-maincontent-info-box-mainbox-link-box-input"
                    value={tempProfile}
                    onChange={handleChangeTempUrl}
                    disabled
                  />
                </div>
                {/* <div className="dashboard-maincontent-info-box-mainbox-link-icon-edit" onClick={handleCopy}>
                      
                    </div> */}
                <div
                  className="dashboard-maincontent-info-box-mainbox-link-icon"
                  onClick={handleCopy}
                >
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.125 0.875H2.5C1.5375 0.875 0.75 1.6625 0.75 2.625V14C0.75 14.4812 1.14375 14.875 1.625 14.875C2.10625 14.875 2.5 14.4812 2.5 14V3.5C2.5 3.01875 2.89375 2.625 3.375 2.625H12.125C12.6062 2.625 13 2.23125 13 1.75C13 1.26875 12.6062 0.875 12.125 0.875ZM15.625 4.375H6C5.0375 4.375 4.25 5.1625 4.25 6.125V18.375C4.25 19.3375 5.0375 20.125 6 20.125H15.625C16.5875 20.125 17.375 19.3375 17.375 18.375V6.125C17.375 5.1625 16.5875 4.375 15.625 4.375ZM14.75 18.375H6.875C6.39375 18.375 6 17.9813 6 17.5V7C6 6.51875 6.39375 6.125 6.875 6.125H14.75C15.2312 6.125 15.625 6.51875 15.625 7V17.5C15.625 17.9813 15.2312 18.375 14.75 18.375Z"
                      fill="#323232"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">&nbsp;</div>
        </div>
        <div className="dashboard-maincontent-quicks">
          <div className="dashboard-maincontent-quicks-head">
            <div className="dashboard-maincontent-quicks-head-h">
              Quick Links
            </div>
            <div className="dashboard-maincontent-quicks-head-cs">
              Comming soon
            </div>
          </div>
          <div className="dashboard-maincontent-quick-cont">
            <div className="dashboard-maincontent-quicks-box-par">
              <div className="dashboard-maincontent-quicks-box">
                <div className="dashboard-maincontent-quicks-box-icon">
                  <i className="fa-light fa-money-bill"></i>
                </div>
                <div className="dashboard-maincontent-quicks-box-goto">
                  <div className="dashboard-maincontent-quicks-box-goto-text">
                    Create payment link
                  </div>
                  <div className="dashboard-maincontent-quicks-box-goto-icon">
                    <i className="fa-light fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-maincontent-quicks-box-par">
              <div className="dashboard-maincontent-quicks-box">
                <div className="dashboard-maincontent-quicks-box-icon">
                  <i className="fa-light fa-plus"></i>
                </div>
                <div className="dashboard-maincontent-quicks-box-goto">
                  <div className="dashboard-maincontent-quicks-box-goto-text">
                    Add a product
                  </div>
                  <div className="dashboard-maincontent-quicks-box-goto-icon">
                    <i className="fa-light fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-maincontent-quicks-box-par">
              <div className="dashboard-maincontent-quicks-box">
                <div className="dashboard-maincontent-quicks-box-icon">
                  <i className="fa-light fa-cube"></i>
                </div>
                <div className="dashboard-maincontent-quicks-box-goto">
                  <div className="dashboard-maincontent-quicks-box-goto-text">
                    Go to Products
                  </div>
                  <div className="dashboard-maincontent-quicks-box-goto-icon">
                    <i className="fa-light fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-maincontent-quicks-box-par">
              <div className="dashboard-maincontent-quicks-box">
                <div className="dashboard-maincontent-quicks-box-icon">
                  <i className="fa-light fa-pencil"></i>
                </div>
                <div className="dashboard-maincontent-quicks-box-goto">
                  <div className="dashboard-maincontent-quicks-box-goto-text">
                    Edit store page
                  </div>
                  <div className="dashboard-maincontent-quicks-box-goto-icon">
                    <i className="fa-light fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
