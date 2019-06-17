import React from 'react';
import './index.css'

export default function Logo(){
    return (
        <div className='logo-container'>
            <img src={require('./job.jpeg')} alt='' />
        </div>
    )
}