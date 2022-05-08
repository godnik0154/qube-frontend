import React from 'react';
import './style.css';
import { ChromePicker } from "react-color";
import ImgCrop from '../ImgCrop';


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

function ColorsSelect({mainColor, name, handleColorChange}) {

    let [activeState,setActiveState] = React.useState(false);
    let [initialColor, setInitialColor] = React.useState(mainColor);
    let [typed, setTyped] = React.useState(true);

    function useOutsideAlerter(ref) {
        React.useEffect(() => {
    
          function loseFocus(e){
            setActiveState(false);
          }
    
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setActiveState(false);
            }
          }
    
          document.addEventListener("mousedown", handleClickOutside);    
          ref.current.addEventListener('keydown',e=>{
            if(e.keyCode===9){
              loseFocus(e);
            }
          })
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
    
      const colorRef = React.useRef(null);
      useOutsideAlerter(colorRef);

    let handleOnOff = (e) => {
        setActiveState(prev=>!prev);        
    }

    let handleOnChange = (e) => {
        setTyped(false);
        setInitialColor(e.hex);
        handleColorChange(name,e.hex);
    }


    return (
        <div ref={colorRef}>
            <div className='onboarding-personal-select_wrap'>
                <ul className="onboarding-personal-select_default_option">
                    <li className="onboarding-personal-select_li-active">
                        <div className="onboarding-personal-select_option-colors pizza">
                            <div className="onboarding-personal-select_icon" style={{backgroundColor:`${initialColor}`}}></div>
                            <i className={`onboarding-personal-select_exp fa-light ${activeState?'fa-xmark':typed?'fa-pen-to-square':'fa-check'}`} onClick={handleOnOff}></i>
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
        </div>
    )
}

function Homepage({handlePrev,handleNext,showLoader}) {

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
    const [showFile, setShowFile] = React.useState(null);
    const [finalData, setFinalData] = React.useState(initialFinalData);
    const [finalImage, setFinalImage] = React.useState(null);
    const [theName, setTheName] = React.useState(null);
    const [imageName, setImageName] = React.useState(null);
    const [imgtype, setImgType] = React.useState(null);
    const [node, setNode] = React.useState(null);
    const [dimension, setDimension] = React.useState([1,1]);

    console.log(
     showFile,
     finalImage,
     theName,
     imageName,
     imgtype,
     node
    )

    let clearAll = () => {
     setShowFile(null);
     setFinalImage(null);
     setTheName(null);
     setImageName(null);
     setImgType(null);
     setNode(null);
    }

    React.useEffect(async ()=>{
        if(finalImage){
            if(theName === 'profile')
            {
                setFinalError({
                    profile: true
                })
            }
    
            setFinalData({
                ...finalData,
                [theName]: {
                    name: imageName,
                    image: await getImage(finalImage),
                    type: imgtype
                }
            });

            node.target.nextElementSibling.style.backgroundImage = `url(${finalImage})`;
            node.target.nextElementSibling.style.backgroundColor = 'unset';
            node.target.previousElementSibling.childNodes[0].style.opacity = 0;
            clearAll();
        }
    },[finalImage])

    let loadFile = async (name, event) => {

        console.log('+++');

        try{
            let dat = URL.createObjectURL(
                event.target.files[0]
            );

            if(name=='profile'){
                setDimension([1,1]);
            }else {
                setDimension([4,3]);
            }    

            let rest = event.target.files[0].name.substring(0, event.target.files[0].name.lastIndexOf(".")),
                last = event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf("."), event.target.files[0].name.length);
    
            let newName = `${rest}-${Date.now()}${last}`.replaceAll(" ","");

            setTheName(name);
            setImageName(newName);
            setImgType(event.target.files[0].type);
    
            // console.log(dat);
            setNode(event);

            setShowFile(dat);
    
            // event.target.nextElementSibling.style.backgroundImage = `url(${dat})`;
            // event.target.nextElementSibling.style.backgroundColor = 'unset';
            // event.target.previousElementSibling.childNodes[0].style.opacity = 0;
        }
        catch(err){
                    console.log(err.message)        
            clearAll();
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

    console.log(showFile);

    let checkNext = () => {
        if(finalErrors.profile){
            return false;
        }
        return true;
    }

    return (
        <div className="onboarding-homepage-part">
            <div className='container'>
                <h2 className="onboarding-homepage-part-heading">Website appearance</h2>
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
                        accept="image/*"
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
                        accept="image/*"
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
                      {showLoader?<div className="login-loader-cont">
                        <div className="login-loader-elmn"></div>
                        </div>:<>Get Started</>}
                    </button>
                </div>
                <br /><br /><br />
            </div>
            {
                showFile?
                <ImgCrop showFile={showFile} setShowFile={setShowFile} setFinalImage={setFinalImage} dimension={dimension} clearAll={clearAll} />:null
            }
        </div>
    )
}

export default Homepage;