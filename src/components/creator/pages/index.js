import React from 'react';
import './style.css';

function Pages(){
    return (
        <div className='creator-dashboard-pages container'>
            <div className='row'>
                <div className='col-lg-3 col-md-4 col-xs-12'>
                    <div className='creator-dashboard-pages-card'>
                        <div className='creator-dashboard-pages-imageArea'>
                            <img src='https://designxplorer.co/wp-content/uploads/2021/01/Sample-10-1024x768.jpg' alt='Card-Image' />
                        </div>
                        <div className='creator-dashboard-pages-text'>
                            <div className='creator-dashboard-pages-text-info'>Home</div>
                            <i className="fa-light fa-ellipsis-vertical creator-dashboard-pages-text-icon"></i>
                        </div>
                        <div className='creator-dashboard-pages-link'>
                            Link: <span className='creator-dashboard-pages-link-text'>qube.com/sakshi</span>
                        </div>
                        <div className='creator-dashboard-pages-publish'>
                            <div className='creator-dahboard-pages-publish-button'>
                                <input className="creator-dahboard-pages-publish-button-inp" id="cb4" type="checkbox" />
                                <label className="creator-dahboard-pages-publish-button-btn" htmlFor="cb4"></label>
                                <span className="creator-dahboard-pages-publish-button-text">Publish</span>
                            </div>
                            <div className='creator-dahboard-pages-publish-sbn'>
                                <button className='btn btn-primary'>
                                    Edit Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default Pages;