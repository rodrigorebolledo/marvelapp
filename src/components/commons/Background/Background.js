import React from 'react';
import './Background.css';

export default function Background(props){
    return (
        <div className="container">
            {props.children}
        </div>
    )
}
