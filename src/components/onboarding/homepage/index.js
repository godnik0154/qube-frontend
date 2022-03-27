import React from 'react';
import './style.css';
import { ChromePicker } from "react-color";

let getBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function ColorsSelect({mainColor, name, handleColorChange}) {

    let [activeState,setActiveState] = React.useState(false);
    let [initialColor, setInitialColor] = React.useState(mainColor);

    let handleOnOff = (e) => {
        setActiveState(prev=>!prev);        
    }

    let handleOnChange = (e) => {
        setInitialColor(e.hex);
        handleColorChange(name,e.hex);
    }


    return (
        <>
            <div className='onboarding-personal-select_wrap'>
                <ul className="onboarding-personal-select_default_option">
                    <li className="onboarding-personal-select_li-active">
                        <div className="onboarding-personal-select_option-colors pizza">
                            <div className="onboarding-personal-select_icon" style={{backgroundColor:`${initialColor}`}}></div>
                            <i className={`onboarding-personal-select_exp fa-light ${activeState?'fa-xmark':'fa-pen-to-square'}`} onClick={handleOnOff}></i>
                        </div>
                    </li>
                </ul>
            </div>
            <div style={{margin:'auto',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                {activeState?<ChromePicker
                    color={initialColor}
                    onChange={handleOnChange}
                />:null}
            </div>
        </>
    )
}

function Homepage({handlePrev,handleNext}) {

    const initialFinalData = {
        profile: {
            name: '',
            image: '',
            type: ''
        },
        cover : {
            name: '',
            image: '',
            type: ''
        },
        brandColor : {
            primary: '#F87369',
            secondary: '#FFC000'
        }
    };

    const initialError = {
        profile: false
    }

    const [finalErrors, setFinalError] = React.useState(initialError);

    const [finalData, setFinalData] = React.useState(initialFinalData);

    let loadFile = async (name, event) => {

        try{
            let dat = URL.createObjectURL(
                event.target.files[0]
            );
    
            let rest = event.target.files[0].name.substring(0, event.target.files[0].name.lastIndexOf(".")),
                last = event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf("."), event.target.files[0].name.length);
    
            let newName = `${rest}-${Date.now()}${last}`;
    
            if(name === 'profile')
            {
                setFinalError({
                    profile: true
                })
            }
    
            setFinalData({
                ...finalData,
                [name]: {
                    name: newName,
                    image: await getBase64(event.target.files[0]),
                    type: event.target.files[0].type               
                }
            })
    
            event.target.nextElementSibling.style.backgroundImage = `url(${dat})`;
            event.target.nextElementSibling.style.backgroundColor = 'unset';
            event.target.previousElementSibling.childNodes[0].style.opacity = 0;
        }
        catch(err){

        }
    };

    let handleColorChange = (name,value) => {
        setFinalData({
            ...finalData,
            brandColor: {
                ...finalData.brandColor,
                [name]: value
            }
        })
    }

    let checkNext = () => {
        if(finalErrors.profile){
            return false;
        }
        return true;
    }

    return (
        <div className="onboarding-homepage-part">
            <div className='container'>
                <h2 className="onboarding-homepage-part-heading">Homepage appearance</h2>
                <h5 className="onboarding-homepage-part-subheading">Display picture</h5>
                <h6 className="onboarding-homepage-part-subsubheading">Add your brand logo or your profile picture - whatever represents you best! </h6>
                <div className='onboarding-homepage-part-profilePic'>
                    <label className='onboarding-homepage-part-profileiconLabel' htmlFor="profilePicture">
                        <button className='onboarding-homepage-part-cam-button'><i className="fa-solid fa-camera"></i></button>
                        <span
                            className='fa-light fa-camera onboarding-homepage-part-profileSpan'
                            style={{ marginTop: "10px" }}
                        ></span>
                        <span className='onboarding-homepage-part-profileSpan'>Change Image</span>
                    </label>
                    <input
                        className='onboarding-homepage-part-profileInput'
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        onChange={e => loadFile('profile', e)}
                        accept="image/png,image/jpg,image/jpeg"
                    />
                    <div className='onboarding-homepage-part-imageArea'></div>
                </div>
                <h5 style={{ marginTop: "2rem" }} className="onboarding-homepage-part-subheading">Cover picture <span>(optional)</span></h5>
                <h6 className="onboarding-homepage-part-subsubheading">Add your brand logo or your profile picture - whatever represents you best! </h6>
                <div className='onboarding-homepage-part-coverPic'>
                    <label className='onboarding-homepage-part-covericonLabel' htmlFor="coverPicture">
                        <button className='onboarding-homepage-part-cam-button'><i className="fa-solid fa-camera"></i></button>
                        <span
                            className='fa-light fa-camera onboarding-homepage-part-coverSpan'
                            style={{ marginTop: "10px" }}
                        ></span>
                        <span className='onboarding-homepage-part-coverSpan'>Change Image</span>
                    </label>
                    <input
                        className='onboarding-homepage-part-coverInput'
                        id="coverPicture"
                        name="coverPicture"
                        type="file"
                        onChange={e => loadFile('cover', e)}
                        accept="image/png,image/jpg,image/jpeg"
                    />
                    <div className='onboarding-homepage-part-imageArea'></div>
                </div>
                <h5 style={{ marginTop: "2rem" }} className="onboarding-homepage-part-subheading">Brand colours <span>(optional)</span></h5>
                <div className="onboarding-homepage-part-colors row">
                    <div className="col-sm-12 col-md-6">
                        <p className="onboarding-homepage-part-colors-heading">Primary</p>
                        <ColorsSelect handleColorChange={handleColorChange} mainColor='#F87369' name='primary' />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <p className="onboarding-homepage-part-colors-heading">Secondary</p>
                        <ColorsSelect handleColorChange={handleColorChange} mainColor='#FFC000' name='secondary' />
                    </div>
                </div>
                <div className="onboarding-btns-group">
                    <button onClick={handlePrev} className="btn onboarding-btn-prev">
                        Previous
                    </button>
                    <button className="btn onboarding-btn-next" onClick={(e)=>handleNext(finalData)} disabled={checkNext()}>
                        Get Started
                    </button>
                </div>
                <br /><br /><br />
            </div>
        </div>
    )
}

export default Homepage;