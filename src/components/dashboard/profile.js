import React from "react";
import "./profile.css";
import { API_URL } from '../../config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../../redux/user/user.action';
import { toast } from 'react-toastify';
import ImgCrop from '../onboarding/ImgCrop'

let getImage = async (url) => {
    const reader = new FileReader();

    let promise = new Promise(async (resolve, reject)=>{
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        }

        const response = await fetch(url)
        const imageBlob = await response.blob()
        reader.readAsDataURL(imageBlob);
    })

    let res = await promise;

    return res;
}


function Profile({
    firstName,
    lastName,
    handleLogChange,
    logoutAct,
    handleLogOutClick,
    profilePicName,
    dob,
    gender,
    password,
    emailValid,
    email,
    phoneValid
}) {

    const dispatch = useDispatch();

    const requestToOtp = async () => {
        let res = await axios.post(`${API_URL}/verify/mail/sent`,{
            email: finalState.email,
            type: email===finalState.email
        });

        return res.data.data;
    }

    const verifyToOtp = async () => {
        if(finalState.emailOtp.length!==6) return false;
        let res = await axios.post(`${API_URL}/verify/mail`,{
            email: email,
            newemail: finalState.email,
            sampleotp: parseInt(finalState.emailOtp)
        });



        return res.data.data==="Valid";
    }

    const [finalState, setFinalState] = React.useState({
        firstName: firstName,
        lastName: lastName,
        dob: dob?dob:"",
        profile:"",
        gender,
        password,
        email,
        emailOtp:"",
        phone:"",
        phoneOtp:""
    });

    const [tempPassword, setTempPassword] = React.useState({
        original:"",
        new:"",
        confirmed:"",
    })

    const [countdown,setCountDown] = React.useState(180);
    const [countdownInterval,setCountDownInterval] = React.useState(180);

    const [errors,setErrors] = React.useState({
        email: emailValid,
        phone: false,
        emailOtp: false,
        controlEmal: false,
        passwordMatch: false
    })

    const [verifiedData, setVerifiedData] = React.useState({
        email: emailValid,
        number: phoneValid
    })

    let handlePasswordChange = (e) => {
        setTempPassword({
            ...tempPassword,
            [e.target.name]: e.target.value
        });

        if(e.target.name==="confirmed"){

            if(tempPassword.original===tempPassword.new){
                setErrors({
                    ...errors,
                    passwordMatch: true
                });
                return;
            }

            if(e.target.value===tempPassword.new){
                setErrors({
                    ...errors,
                    passwordMatch: false
                });
            } else {
                setErrors({
                    ...errors,
                    passwordMatch: true
                });
            }
        }
    }

    let changeGender = (e,value) => {
        e.target.parentElement.parentElement.removeAttribute('open');
        setFinalState({
            ...finalState,
            gender: value
        })
    }

    let handleChange = (e) => {
        setFinalState({
            ...finalState,
            [e.target.name]: e.target.value
        });

        if(e.target.name==="email"){
            var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            let val = String(e.target.value).search(filter) !== -1;
            let emailSame = e.target.value === email && emailValid;
            setErrors({
                ...errors,
                email: !val || emailSame,
                control: !val || emailSame,
            });
        }
    }

    let handlePictureClick = (e) => {
        e.target.nextElementSibling.click();
    }

    const [phase,setPhase] = React.useState(1);



    let handleExpand = (e) => {

        let nodes = document.querySelectorAll(`.${e.classList[0]}`);

        if(e.parentElement.nextElementSibling.childNodes[0].style.display === 'none'){

            nodes.forEach((key,index)=>{
                if(key!==e){
                    key.parentElement.parentElement.style.opacity = 1;
                    key.parentElement.parentElement.style.pointerEvents = 'all';
                    key.parentElement.parentElement.style.userSelect = 'auto';
                }
            })

            e.parentElement.nextElementSibling.childNodes[0].classList.add('fadeInBottom');
            e.parentElement.nextElementSibling.childNodes[0].style.display = 'inherit';
            e.parentElement.nextElementSibling.childNodes[1].style.display = 'none';
            e.parentElement.nextElementSibling.childNodes[1].classList.remove('fadeInBottom');
            e.setAttribute('title','Edit')
            e.textContent = 'Edit';
        } else {

            nodes.forEach((key,index)=>{
                if(key!==e){
                    key.parentElement.parentElement.style.opacity = 0.5;
                    key.parentElement.parentElement.style.pointerEvents = 'none';
                    key.parentElement.parentElement.style.userSelect = 'none';
                }
            })

            e.textContent = 'Cancel';
            e.setAttribute('title','Cancel')
            e.parentElement.nextElementSibling.childNodes[1].classList.add('fadeInBottom');
            e.parentElement.nextElementSibling.childNodes[0].style.display = 'none';
            e.parentElement.nextElementSibling.childNodes[1].style.display = 'inherit';
            e.parentElement.nextElementSibling.childNodes[0].classList.remove('fadeInBottom');
        }
    }

    let onNumberInput = (e) =>{
        let val = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        e.target.value = val;
        if(val.length>6){
            val = val.substr(0,6);
        }
        setErrors({
            ...errors,
            emailOtp: val.length!==6
        })

        setFinalState({
            ...finalState,
            emailOtp: val
        })
    }

    React.useEffect(()=>{
        if(countdown===0){
            clearInterval(countdownInterval);
            setCountDown(180);
            setPhase(1);
            setFinalState({
                ...finalState,
                emailOtp: ""
            })
        }
    },[countdown]);


    const [showFile, setShowFile] = React.useState(null);
    const [finalImage, setFinalImage] = React.useState(null);
    const [imageName, setImageName] = React.useState(null);
    const [imgtype, setImgType] = React.useState(null);
    const [node, setNode] = React.useState(null);


    let clearAll = () => {
     setShowFile(null);
     setFinalImage(null);
     setImageName(null);
     setImgType(null);
     setNode(null);
    }

    React.useEffect(()=>{

        let doWork = async () => {
            if(finalImage){

                let imageData = await getImage(finalImage)

                let temp = {
                    name: imageName,
                    image: imageData,
                    type: imgtype
                }

                setFinalState({
                    ...finalState,
                    profile: temp
                });

                let res = await axios.post(`${API_URL}/onboarding/updateProfileImage`,{
                    email: finalState.email,
                    profile: temp
                });

                if(res.status===200){
                    toast.success('Profile Image Updated Successfully');
                    dispatch(updateUserDetails({
                        field: 'profile',
                        value: {
                            name: temp.name,
                            type: imgtype
                        }
                    }));
                    node.target.parentElement.previousElementSibling.childNodes[0].style.backgroundImage = `url(${finalImage})`;
                } else {
                    toast.error('Server Error');
                }
                clearAll();
            }
        }

        doWork();

    },[finalImage])

    let loadFile = async (event) => {


        try{
            let dat = URL.createObjectURL(
                event.target.files[0]
            );


            let rest = event.target.files[0].name.substring(0, event.target.files[0].name.lastIndexOf(".")),
                last = event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf("."), event.target.files[0].name.length);

            let newName = `${rest}-${Date.now()}${last}`.replaceAll(" ","");

            setImageName(newName);
            setImgType(event.target.files[0].type);
            setNode(event);
            setShowFile(dat);
        }
        catch(err){
            clearAll();
        }
    };



    let takeEmailAction = async (e) => {
        // let inputBox = e.target.previousElementSibling.childNodes[0].childNodes[0];

        setErrors({
            ...errors,
            control: true
        })

        if(e.target.textContent.toLocaleLowerCase()==="verify"){
            let val = await requestToOtp();
            if(val==="Email Sent"){
                let interval = setInterval(() => {
                    setCountDown(countdown => countdown -1);
                }, 1000);
                setCountDownInterval(interval);
                setPhase(2);
            }
            else if(val==="Email is Already taken"){
                toast.error('Email is already taken');
            } else {
                toast.error('Server Error');
            }
        } else {
            clearInterval(countdownInterval);
            setCountDownInterval(null);
            let val = await verifyToOtp();
            if(val)
            {
                setPhase(1);
                dispatch(updateUserDetails({
                    field: 'email',
                    value: finalState.email
                }));

                dispatch(updateUserDetails({
                    field: 'emailValid',
                    value: true
                }));

                toast.success("Email Verified Successfully");

                handleExpand(e.target.parentElement.parentElement.parentElement.previousElementSibling.childNodes[1]);
            } else
                toast.error("Otp is Invalid");
        }

        setErrors({
            ...errors,
            control: false
        })
    }

    function validPassword(e) {
        return /\d/.test(e) && e.length >= 6;
      }

    let handleNameSubmit = async (e) => {
        setErrors({
            ...errors,
            control: true
        })
        let res = await axios.post(`${API_URL}/profile/general`,{
            email: finalState.email,
            field: 'firstName',
            value: finalState.firstName
        });

        let data = res.data.data;

        if(data!==true){
            toast.error('Email is invalid');
            setErrors({
                ...errors,
                control: false
            })
            return;
        }

        res = await axios.post(`${API_URL}/profile/general`,{
            email: finalState.email,
            field: 'lastName',
            value: finalState.lastName
        });

        data = res.data.data;

        if(data!==true){
            toast.error('Email is invalid');
            setErrors({
                ...errors,
                control: false
            })
            return;
        }

        dispatch(updateUserDetails({
            field: 'firstName',
            value: finalState.firstName
        }));

        dispatch(updateUserDetails({
            field: 'lastName',
            value: finalState.lastName
        }));

        setErrors({
            ...errors,
            control: false
        })

        handleExpand(e.target.parentElement.parentElement.previousElementSibling.childNodes[1]);

        toast.success("Name Updated Successfully");
    }

    // console.log(errors.passwordMatch,"{{}")

    let handleGenderSubmit = async (e) => {
        setErrors({
            ...errors,
            control: true
        })
        let res = await axios.post(`${API_URL}/profile/general`,{
            email: finalState.email,
            field: 'gender',
            value: finalState.gender
        });

        let data = res.data.data;

        if(data!==true){
            toast.error('Email is invalid');
            setErrors({
                ...errors,
                control: false
            })
            return;
        }

        toast.success("Gender Updated Successfully");

        dispatch(updateUserDetails({
            field: 'gender',
            value: finalState.gender
        }));

        setErrors({
            ...errors,
            control: false
        })

        handleExpand(e.target.parentElement.parentElement.parentElement.previousElementSibling.childNodes[1]);
    }

    let handleDobSubmit = async (e) => {
        setErrors({
            ...errors,
            control: true
        })
        let res = await axios.post(`${API_URL}/profile/general`,{
            email: finalState.email,
            field: 'dob',
            value: finalState.dob
        });

        let data = res.data.data;

        if(data!==true){
            toast.error('Email is invalid');
            setErrors({
                ...errors,
                control: false
            })
            return;
        }

        dispatch(updateUserDetails({
            field: 'dob',
            value: finalState.dob
        }));

        toast.success("Date of Birth Updated Successfully");

        setErrors({
            ...errors,
            control: false
        })
        handleExpand(e.target.parentElement.parentElement.parentElement.previousElementSibling.childNodes[1]);
    }

    let handlePasswordSubmit = async (e) => {

        setErrors({
            ...errors,
            control: true
        })

        if(validPassword(tempPassword.new)===false){
            toast.error('Make sure your password minimum length is 6 and it doesn\'t contains space')
            setErrors({
                ...errors,
                control: false
            })
            return;
        }

        let res = await axios.post(`${API_URL}/verify/password`,{
            email: finalState.email,
            password: tempPassword.original
        });

        let data = res.data.data;

        if(data!==true){
            toast.error('Original Password is invalid');
            setErrors({
                ...errors,
                control: false
            })
            return;
        }

        res = await axios.post(`${API_URL}/profile/password`,{
            email: finalState.email,
            password: tempPassword.new
        });

        data = res.data.data;

        if(data!==true){
            toast.error('Server Error');
            setErrors({
                ...errors,
                control: false
            })
            return;
        }

        setErrors({
            ...errors,
            control: false
        })

        toast.success('Password Successfully Changed');
    }


    return (
        <>
            {
                window.screen.width >= 500 ? (
                    <div className="dashboard-profile-maincontent-header">
                        <div className="dashboard-maincontent-header-cta-btn">
                            <div className="dashboard-maincontent-header-cta-btn-name">
                                {firstName} {lastName}
                            </div>
                            <div className="dashboard-maincontent-header-cta-btn-icon" onClick={handleLogChange}>
                                <i className={`fa-light fa-angle-${logoutAct ? "up" : "down"}`}></i>
                            </div>
                        </div>
                        <div className={`dashboard-maincontent-header-lgn-btn ${logoutAct ? "closed" : ""}`} onClick={handleLogOutClick} style={{marginTop: "10px",padding: "10px 4%"}}>
                            <div className="dashboard-maincontent-header-lgn-btn-icon">
                                <i className="fa-light fa-arrow-right-from-bracket"></i>
                            </div>
                            <div className="dashboard-maincontent-header-lgn-btn-name">
                                Sign Out
                            </div>
                        </div>
                    </div>
                ):null
            }
            <div className="dashboard-profile-header">Profile</div>
            <div className='dashboard-profile-boxes'>
                <div className='dashboard-profile-information row'>
                    <div className="dashboard-profile-information--box col-md-6 col-xs-12">
                        <div className="dashboard-profile-information--box-head">
                            <div className="dashboard-profile-information--box-head__parent">
                                <div className="dashboard-profile-information--box-head__photo">
                                    <div
                                        className="dashboard-profile-maincontent-header-picture"
                                        style={{
                                            backgroundImage: `url("${`${API_URL}/profile/getImage/${profilePicName}`}")`,
                                        }}
                                    />
                                </div>
                                <div className="dashboard-profile-information--box-head__detail">
                                    <div className="dashboard-profile-information--box-head__detail--name">
                                        {firstName} {lastName}
                                    </div>
                                    <div className="dashboard-profile-information--box-head__detail--upload" onClick={handlePictureClick} title="Update Profile Picture">
                                        Update Profile Photo
                                    </div>
                                    <input
                                        className='dashboard-profile-information--box-head__detail--file'
                                        type="file"
                                        onChange={loadFile}
                                        accept="image/*"
                                        style={{display:"none",pointerEvents:"none"}}
                                    />
                                </div>
                            </div>
                            <div className="dashboard-profile-information--box-head__fullname">
                                <div className="dashboard-profile-information--box-head__fullname--heading">
                                    <div className="dashboard-profile-information--box-head__fullname--heading-name">
                                        Full Name
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--heading-link" title="Edit" onClick={(e) =>handleExpand(e.target)}>
                                        Edit
                                    </div>
                                </div>
                                <div className="dashboard-profile-information--box-head__fullname--value">
                                    <div className="dashboard-profile-information--box-head__fullname--value_edited">
                                        {firstName} {lastName}
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--value_unedited">
                                        <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent">
                                            <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child">
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_label">
                                                    First Name
                                                </div>
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box">
                                                    <input type="text" className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input" value={finalState.firstName} name='firstName' onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child">
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_label">
                                                    Last Name
                                                </div>
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box">
                                                    <input type="text" className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input" value={finalState.lastName} name='lastName' onChange={handleChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child_btn ${finalState.firstName==="" || errors.control || finalState.lastName===""?"valis":""}`} onClick={handleNameSubmit}>
                                            Save
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-profile-information--box-head__dob">
                                <div className="dashboard-profile-information--box-head__fullname--heading">
                                    <div className="dashboard-profile-information--box-head__fullname--heading-name">
                                        Date Of Birth
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--heading-link" title="Edit" onClick={(e) =>handleExpand(e.target)}>
                                        Edit
                                    </div>
                                </div>
                                <div className="dashboard-profile-information--box-head__fullname--value">
                                    <div className="dashboard-profile-information--box-head__fullname--value_edited">
                                        {
                                            dob?dob:"Not Specified"
                                        }
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--value_unedited">
                                        <div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent">
                                            <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child" style={{width:"100%",margin:"0"}}>
                                                <div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent_box">
                                                    <input type="date" className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input--dob" name='dob' onChange={handleChange}  data-date="" placeholder="DD MM YYYY" value={finalState.dob}/>
                                                    <i className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent_box-icon fa-thin fa-calendar"></i>
                                                </div>
                                            </div>
                                            <div className={`dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child_btn ${finalState.dob==="" || errors.control?"valis":""}`} onClick={handleDobSubmit}>
                                                Save
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-profile-information--box-head__dob">
                                <div className="dashboard-profile-information--box-head__fullname--heading">
                                    <div className="dashboard-profile-information--box-head__fullname--heading-name">
                                        Gender
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--heading-link" title="Edit" onClick={(e) =>handleExpand(e.target)}>
                                        Edit
                                    </div>
                                </div>
                                <div className="dashboard-profile-information--box-head__fullname--value">
                                    <div className="dashboard-profile-information--box-head__fullname--value_edited">
                                        {
                                            finalState.gender?finalState.gender:"Not Specified"
                                        }
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--value_unedited">
                                        <div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent">
                                            <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child" style={{width:"100%",margin:"0"}}>
                                                <div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent_box">
                                                    <details className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input--gender">
                                                        <summary>{finalState.gender?finalState.gender:"gender"}</summary>
                                                        <ul>
                                                            <li onClick={(e)=>changeGender(e,'male')}>Male</li>
                                                            <li onClick={(e)=>changeGender(e,'female')}>Female</li>
                                                            <li onClick={(e)=>changeGender(e,'other')}>Other</li>
                                                        </ul>
                                                    </details>
                                                </div>
                                            </div>
                                            <div className={`dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child_btn ${errors.control?"valis":""}`} onClick={handleGenderSubmit}>
                                                Save
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-profile-information--box-head__dob">
                                <div className="dashboard-profile-information--box-head__fullname--heading">
                                    <div className="dashboard-profile-information--box-head__fullname--heading-name sp-dash-head">
                                        Email Address
                                        {!verifiedData.email?<div className="dashboard-profile-information--box-head__fullname--heading-name__inval">
                                            Not verified
                                        </div>:<div className="dashboard-profile-information--box-head__fullname--heading-name__val">
                                           <i className="fa-thin fa-circle-check"></i>
                                            verified
                                        </div>}
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--heading-link" title="Edit" onClick={(e) =>handleExpand(e.target)}>
                                        Edit
                                    </div>
                                </div>
                                <div className="dashboard-profile-information--box-head__fullname--value">
                                    <div className="dashboard-profile-information--box-head__fullname--value_edited" style={{textTransform:"initial"}}>
                                        {finalState.email}
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--value_unedited">
                                        <div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent">
                                            <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child" style={{width:"100%",margin:"0"}}>
                                                <div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent_box">
                                                    {phase===1?
                                                        <input type="text" className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input" value={finalState.email} name='email' onChange={handleChange}  style={errors.email?{border:"1px solid #e74c3c",textTransform:"initial"}:{textTransform:"initial"}}/>:
                                                        <input type="text" className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input" value={finalState.emailOtp} style={errors.emailOtp?{border:"1px solid #e74c3c",textTransform:"initial"}:{textTransform:"initial"}} onInput={onNumberInput}/>}
                                                    <div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent_box--help">
                                                       {phase===2?<>Enter the 6 digit code Qube sent to {finalState.email.toLocaleLowerCase()}</>:
                                                       <>We’ll send you a code to your new email to verify</>}
                                                    </div>
                                                    {phase===2?<div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent_box--timer">Time Remaning: {countdown} seconds</div>:null}
                                                </div>
                                            </div>
                                            <div className={`dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child_btn ${errors.email && errors.control || email===finalState.email?"valis":""}`} onClick={takeEmailAction}>
                                                {phase===1?<>Verify</>:<>Submit</>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-profile-information--box-head__dob">
                                <div className="dashboard-profile-information--box-head__fullname--heading">
                                    <div className="dashboard-profile-information--box-head__fullname--heading-name sp-dash-head">
                                        Password
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--heading-link" title="Edit" onClick={(e) =>handleExpand(e.target)}>
                                        Edit
                                    </div>
                                </div>
                                <div className="dashboard-profile-information--box-head__fullname--value">
                                    <div className="dashboard-profile-information--box-head__fullname--value_edited password_display">
                                        .........
                                    </div>
                                    <div className="dashboard-profile-information--box-head__fullname--value_unedited">
                                        <div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent">
                                            <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child" style={{width:"100%",margin:"0"}}>
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_label">
                                                    Original Password
                                                </div>
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box">
                                                    <input type="password" className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input" value={tempPassword.original} name='original' onChange={handlePasswordChange}/>
                                                </div>
                                                <br />
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_label">
                                                    New password
                                                </div>
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box">
                                                    <input type="password" className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input" value={tempPassword.new} name='new' onChange={handlePasswordChange}/>
                                                </div>
                                                <br />
                                                <div className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_label">
                                                    Confirm Password
                                                </div>
                                                <div className={`dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box ${errors.passwordMatch?"invalid-box":""}`}>
                                                    <input type="password" className="dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_box_input" value={tempPassword.confirmed} name='confirmed' onChange={handlePasswordChange}/>
                                                </div>
                                                {tempPassword.original===tempPassword.new && tempPassword.new!==""?<div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent_box--help err">
                                                    Original Password can't be same as new password
                                                </div>:errors.passwordMatch?<div className="dashboard-profile-information--box-head__dob--value_unedited_inp-parent_box--help err">
                                                    The above two password doesn't match
                                                </div>:null}
                                            </div>
                                            <div className={`dashboard-profile-information--box-head__fullname--value_unedited_inp-parent_child_btn ${tempPassword.original==="" || tempPassword.new==="" || tempPassword.confirmed==="" || errors.passwordMatch || errors.control?'valis':''}`} onClick={handlePasswordSubmit}>
                                                Save
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </div>
            {
                showFile?
                <ImgCrop showFile={showFile} setShowFile={setShowFile} setFinalImage={setFinalImage} dimension={[1,1]} clearAll={clearAll} />:null
            }
        </>
    );
}

export default Profile;
