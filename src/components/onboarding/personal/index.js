import React from 'react';
import './style.css';

function Personal({handleNext, finalDataToBack}) {
  const socialIcons = [
    {
      name: 'facebook',
      icon: 'fa-brands fa-facebook',
      background: '#1877F2',
      regex: /(www.facebook.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.facebook.com/xyz',
      color: '#fff',
    },
    {
      name: 'twitter',
      regex: /(www.twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.twitter.com/xyz',
      icon: 'fa-brands fa-twitter',
      background: '#1DA1F2',
      color: '#fff',
    },
    {
      name: 'linkedin',
      regex: /www.linkedin\.com\/in\/[A-z0-9_-]+\/?/,
      placeholder: 'www.linkedin.com/in/xyz',
      icon: 'fa-brands fa-linkedin-in',
      background: '#2867B2',
      color: '#fff',
    },
    {
      name: 'youtube',
      placeholder: 'www.youtube.com/c/xyz',
      regex: /www.youtube\.com\/c\/[A-z0-9_-]+\/?/,
      icon: 'fa-brands fa-youtube',
      background: '#FF0000',
      color: '#fff',
    },
    {
      name: 'instagram',
      regex: /(www.instagram.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.instagram.com/xyz',
      icon: 'fa-brands fa-instagram',
      background: '#F00073',
      color: '#fff',
    },
    {
      name: 'pinterest',
      regex: /(www.pinterest.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.pinterest.com/xyz',
      icon: 'fa-brands fa-pinterest',
      background: '#E60023',
      color: '#fff',
    },
    {
      name: 'github',
      regex: /(www.github.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.github.com/xyz',
      icon: 'fa-brands fa-github',
      background: '#231E1B',
      color: '#fff',
    },
    {
      name: 'gitlab',
      regex: /(www.gitlab.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.gitlab.com/xyz',
      icon: 'fa-brands fa-gitlab',
      background: '#FC6D26',
      color: '#fff',
    },
    {
      name: 'medium',
      regex: /(www.medium.com\/@(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.medium.com/@xyz',
      icon: 'fa-brands fa-medium',
      background: '#fff',
      color: '#000000',
    },
    {
      name: 'dribble',
      regex: /(www.dribble.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.dribble.com/xyz',
      icon: 'fa-brands fa-dribbble',
      background: '#EA4C89',
      color: '#fff',
    },
    {
      name: 'behance',
      regex: /(www.be.net\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
      placeholder: 'www.be.net/xyz',
      icon: 'fa-brands fa-behance',
      background: '#1157FF',
      color: '#fff',
    },
    {
      name: 'public',
      regex:
        /www[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      url: 'www.abc.xyz',
      icon: 'fa-solid fa-earth-americas',
      background: 'transparent',
      color: '#fff',
    },
  ];

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [mainData, setMainData] = React.useState({
    firstName: finalDataToBack.firstName?finalDataToBack.firstName:'',
    lastName: finalDataToBack.lastName?finalDataToBack.lastName:'',
    brand: finalDataToBack.brand?finalDataToBack.brand:'',
    intro: finalDataToBack.intro?finalDataToBack.intro:'',
    socialData: finalDataToBack.socialData?finalDataToBack.socialData:[],
  });
  const [errorData, setErrorData] = React.useState({
    firstName: '',
    lastName: '',
    brand: '',
    intro: '',
    socialData: [],
  });

  const [selectedSocials, setSelectedSocials] = React.useState([]);

  const nextDisabled = () => {

    let validSocials = true;
    errorData.socialData.forEach((item,inde)=>{
      validSocials = validSocials && item==='' && mainData.socialData[inde].url !== '';
    });

    if(mainData.firstName === '' || errorData.firstName !== '' || mainData.lastName == '' || errorData.lastName !== '' || mainData.intro === '' || errorData.intro !== '' || !validSocials)
      return true;
    return false;
  }

  const handleButtonAdd = (e) => {
    setSelectedSocials([
      ...selectedSocials,
      {
        name: 'instagram',
        regex: /(www.instagram.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
        placeholder: 'www.instagram.com/xyz',
        icon: 'fa-brands fa-instagram',
        background: '#F00073',
        color: '#fff',
      },
    ]);

    setMainData({
      ...mainData,
      socialData: [
        ...mainData.socialData,
        {
          name: 'instagram',
          regex: /(www.instagram.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
          valid: false,
          url: '',
        },
      ],
    });

    setErrorData({
      ...errorData,
      socialData: [...errorData.socialData, ''],
    });
  };

  const handleDeleteSocial = (ind) => {
    let newArr = [];

    for (let i = 0; i < selectedSocials.length; i++) {
      if (i == ind) continue;

      newArr.push(selectedSocials[i]);
    }

    setSelectedSocials(newArr);

    newArr = [];

    for (let i = 0; i < mainData.socialData.length; i++) {
      if (i == ind) continue;

      newArr.push(mainData.socialData[i]);
    }

    setMainData({
      ...mainData,
      socialData: newArr,
    });

    newArr = [];

    for (let i = 0; i < errorData.socialData.length; i++) {
      if (i == ind) continue;

      newArr.push(errorData.socialData[i]);
    }

    setErrorData({
      ...errorData,
      socialData: newArr,
    });
  };

  const handleIndiSocChange = (value, index) => {
    let itemsTobeSet = [];

    socialIcons.forEach((item) => {
      if (item.name === value) {
        itemsTobeSet = item;
      }
    });

    selectedSocials[index] = itemsTobeSet;

    for (let i = 0; i < mainData.socialData.length; i++) {
      if (i === index) {
        mainData.socialData[i] = {
          name: itemsTobeSet.name,
          regex: itemsTobeSet.regex,
          value: false,
          url: '',
        };
      }
    }

    setSelectedSocials(selectedSocials);
    setMainData(mainData);

    forceUpdate();
  };

  const handleMainChange = (name, value) => {
    if (name === 'firstName' || name === 'lastName') {
      value = value.trim();
      let format = /[!@#$%^&*()_+\-=\[\]{};0123456789':"\\|,.<>\/?]+/;
      if (value === '') {
        if (name === 'firstName')
          errorData[name] = `Please enter your First name`;
        else errorData[name] = `Please enter your Last name`;
      } else if (format.test(value)) {
        errorData[name] = 'Remove any number or special character';
      } else {
        errorData[name] = '';
      }

      setMainData({
        ...mainData,
        [name]: value,
      });
    }

    if (name === 'intro') {
      if (value === '') {
        errorData[name] = 'Add a short introduction for your website visitors';
        setMainData({
          ...mainData,
          [name]: value,
        });
      } else if (value.trim().length > 150)
        errorData[name] = 'Too wordy? Try to keep it within 150 characters';
      else {
        errorData[name] = '';
        setMainData({
          ...mainData,
          [name]: value,
        });
      }
    }

    if (name === 'brand') {
      setMainData({
        ...mainData,
        [name]: value,
      });
    }

    setErrorData(errorData);

    forceUpdate();
  };

  const handleSocialLinkChange = (index, value) => {
    value = value.trim();

    let regex = mainData.socialData[index].regex;
    let valid = regex.test(value);

    if (valid === false) {
      errorData.socialData[
        index
      ] = `Enter the URL in the correct format ${selectedSocials[index].placeholder}`;
    }
    if (valid === true) {
      errorData.socialData[index] = '';
    }

    mainData.socialData[index].url = value;

    setErrorData(errorData);
    setMainData(mainData);

    forceUpdate();
  };

  return (
    <div className="onboarding-personal-part">
      <h2 className="onboarding-personal-part-heading">Personal details</h2>
      <div className="onboarding-personal-part-form row">
        <div className="onboarding-personal-part-inp-grp col-md-6">
          <label className="onboarding-personal-part-label">
            First name
            <span className="onboarding-personal-part-label-required">*</span>
          </label>
          <input
            type="text"
            className="form-control onboarding-personal-part-input"
            placeholder="Eg, Tony"
            value={mainData.firstName}
            onChange={(e) => handleMainChange('firstName', e.target.value)}
            style={{
              border:
                errorData.firstName.length === 0
                  ? '1px solid #8F8F8F'
                  : '1px solid #ED340B',
            }}
          />
          {errorData.firstName.length !== 0 ? (
            <div className="onboarding-personal-part-invalid-feedback">
              <i className="fa-regular fa-circle-info"></i>
              {errorData.firstName}
            </div>
          ) : null}
        </div>
        <div className="onboarding-personal-part-inp-grp col-md-6">
          <label className="onboarding-personal-part-label">
            Last name
            <span className="onboarding-personal-part-label-required">*</span>
          </label>
          <input
            type="text"
            className="form-control onboarding-personal-part-input"
            placeholder="Eg, Stark"
            value={mainData.lastName}
            onChange={(e) => handleMainChange('lastName', e.target.value)}
            style={{
              border:
                errorData.lastName.length === 0
                  ? '1px solid #8F8F8F'
                  : '1px solid #ED340B',
            }}
          />
          {errorData.lastName.length !== 0 ? (
            <div className="onboarding-personal-part-invalid-feedback">
              <i className="fa-regular fa-circle-info"></i>
              {errorData.lastName}
            </div>
          ) : null}
        </div>
        <div className="onboarding-personal-part-inp-grp col-md-12">
          <label className="onboarding-personal-part-label">
            Brand/Page name
            <span className="onboarding-personal-part-label-opt">
              (Optional)
            </span>
          </label>
          <input
            type="text"
            className="form-control onboarding-personal-part-input"
            placeholder="Eg, Stark’s Tech Squad"
            value={mainData.brand}
            onChange={(e) => handleMainChange('brand', e.target.value)}
          />
        </div>
        <div className="onboarding-personal-part-inp-grp col-md-12">
          <label className="onboarding-personal-part-label">
            Website intro - Add a one line summary about you / your brand
            <span className="onboarding-personal-part-label-required">*</span>
          </label>
          <input
            type="text"
            className="form-control onboarding-personal-part-input"
            placeholder="Eg, I solve the world’s toughest tech problems "
            value={mainData.intro}
            onChange={(e) => handleMainChange('intro', e.target.value)}
            style={{
              border:
                errorData.intro.length === 0
                  ? '1px solid #8F8F8F'
                  : '1px solid #ED340B',
            }}
          />
          <div className="onboarding-personal-part-bio">
            {errorData.intro.length !== 0 ? (
              <div className="onboarding-personal-part-invalid-feedback">
                <i className="fa-regular fa-circle-info"></i>
                {errorData.intro}
              </div>
            ) : (
              <div>&nbsp;</div>
            )}
            <div className="onboarding-personal-part-character-cnt">
              <span
                style={{
                  color:
                    mainData.intro.trim().length > 150 ? '#ED340B' : 'inherit',
                }}
              >
                {mainData.intro.trim().length}
              </span>
              /150
            </div>
          </div>
        </div>
        <div className="onboarding-personal-part-inp-grp col-md-12">
          <div className="onboarding-personal-part-label">
            Social media profiles
            <span className="onboarding-personal-part-label-opt">
              (Optional)
            </span>
          </div>
          <div className="onboarding-personal-part-sub-label">
            Display your social media profiles on your page
          </div>
          {selectedSocials.map((soc, inde) => {
            return (
              <div className="onboarding-personal-part-soc-inp-grp" key={inde}>
                <div className="onboarding-personal-part-soc-dot">
                  <i className="fa-solid fa-grip-dots-vertical"></i>
                </div>
                <div className="onboarding-personal-part-soc-inp">
                  <div className="onboarding-personal-part-sb-par input-group">
                    <div className="input-group-text onboarding-personal-part-soc-sel">
                      <div
                        className="onboarding-personal-part-soc-icons"
                        style={{ background: soc.background }}
                      >
                        <i
                          className={soc.icon}
                          style={{ color: soc.color }}
                        ></i>
                      </div>
                      <select
                        className="onboarding-personal-part-soc-icons-list"
                        onChange={(e) =>
                          handleIndiSocChange(e.target.value, inde)
                        }
                      >
                        {socialIcons.map((item, ind) => {
                          return <option key={ind}>{item.name}</option>;
                        })}
                      </select>
                    </div>
                    <input
                      type="text"
                      className="form-control onboarding-personal-part-soc-inp-nes"
                      placeholder={`Enter URL (Eg - ${soc.placeholder} )`}
                      value={mainData.socialData[inde].url}
                      onChange={(e) =>
                        handleSocialLinkChange(inde, e.target.value)
                      }
                    />
                    <div className="onboarding-personal-part-soc-inp-break" />
                    {errorData.socialData[inde] !== '' ? (
                      <div className="onboarding-personal-part-invalid-feedback">
                        <i className="fa-regular fa-circle-info"></i>
                        {errorData.socialData[inde]}
                      </div>
                    ) : (
                      <div>
                        {
                          window.screen.width < 400 ?
                          <>&nbsp;&nbsp;&nbsp;&nbsp;</>:
                          window.screen.width < 500 ?
                          <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>:
                          <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                        }                      
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="onboarding-personal-part-soc-bin"
                  onClick={(e) => handleDeleteSocial(inde)}
                >
                  <i className="fa-light fa-trash"></i>
                </div>
              </div>
            );
          })}
          <button
            className="onboarding-personal-part0ico-btn"
            onClick={handleButtonAdd}
          >
            <i className="fa-solid fa-plus"></i> Add new social link
          </button>
        </div>
        <div className="onboarding-btns-group">
          <div>&nbsp;</div>
          <button className="btn onboarding-btn-next" disabled={nextDisabled()} onClick={()=>handleNext(mainData)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Personal;
