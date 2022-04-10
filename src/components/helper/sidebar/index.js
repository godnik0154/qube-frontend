import React from 'react';
import './style.css'

function Sidebar({ children, open }){

    return (
        <div className={`sidebar-main${open?"":" closed"}`}>
            {children}
        </div>
    )
}

export default Sidebar;