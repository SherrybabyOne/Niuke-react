import React from 'react';
import logoImg from './job.jpeg';
import './index.less'

export default function Logo(){
    return (
        <div className='logo-container'>
            <img src={logoImg} alt='' />
        </div>
    )
}