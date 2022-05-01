import React from "react";
import "./style.css";

function Modal({ children }) {
  return (
    <div className="modalBackground">
        {children}
    </div>
  );
}

export default Modal;