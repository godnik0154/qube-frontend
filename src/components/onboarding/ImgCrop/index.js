import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Modal from '../../modal';

import { getCroppedImg } from './canvasUtils';
import './style.css'

const Imgcrop = ({
  showFile,
  setShowFile,
  setFinalImage,
  dimension,
  clearAll
}) => {

  const [imageSrc, setImageSrc] = React.useState(showFile);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const setGoImage = (e) => {
    setFinalImage(croppedImage);
    setModalOpen(false);
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );

      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels])

  React.useEffect(()=>{
    console.log(imageSrc);
    if(imageSrc)
      setModalOpen(true);
  },[imageSrc])

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const destoryModal = (e) => {
    clearAll();
    setModalOpen(false);
  }

  React.useEffect(()=>{
    if(document.querySelector('.imgcrop-sliderRange')){
      var value = (zoom-document.querySelector('.imgcrop-sliderRange').min)/(document.querySelector('.imgcrop-sliderRange').max-document.querySelector('.imgcrop-sliderRange').min)*100;
      document.querySelector('.imgcrop-sliderRange').style.background = 'linear-gradient(to right, #0085FF 0%, #0085FF ' + value + '%, #99ceff ' + value + '%, #99ceff 100%)';
    }
  },[zoom,croppedImage])

  console.log(modalOpen)

  return (
    <div>
      {modalOpen && <Modal>
          <div className="imgcrop-modalContainer">
            {croppedImage?              
              <>
                <div className="imgcrop-title">
                  <div className='imgcrop-head'>Croped Image</div>
                  <div className="imgcrop-titleCloseBtn">
                    <button onClick={onClose}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
                <div className="imgcrop-body">
                  <div className='imgcrop-imagecontainer'>
                   <img src={croppedImage} alt="Cropped" className='imgcrop-img' />    
                  </div>
                </div>
                <div className="imgcrop-footer">
                  <button onClick={onClose} className="imgcrop-cancelBtn">Go Back</button>
                  <button onClick={setGoImage} className="imgcrop-doneBtn">Confirm image</button>
                </div>
              </>:
              <>
                <div className="imgcrop-title">
                  <div className='imgcrop-head'>Crop Your Profile Picture</div>
                  <div className="imgcrop-titleCloseBtn">
                    <button onClick={destoryModal}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
                <div className="imgcrop-body">
                  <div className='imgcrop-cropcontainer'>
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={dimension[0] / dimension[1]}
                      showGrid={false}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      objectFit="vertical-cover"
                    />
                  </div>
                  <div className='imgcrop-controls'>
                    <div className='imgcrop-sliderContainer'>
                      <div className='imgcrop-slideLabel'>Zoom</div>
                      <input className="imgcrop-sliderRange" type="range" min="1" max="5" step=".1" value={zoom} onChange={(e) => setZoom(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="imgcrop-footer">
                  <button onClick={destoryModal} className="imgcrop-cancelBtn">Cancel</button>
                  <button onClick={showCroppedImage} className="imgcrop-doneBtn">Crop Image</button>
                </div>
              </>
            }
          </div>
      </Modal>}
    </div>
  )
}

export default Imgcrop;