import React from 'react';
import './ui/Loader.css'
const Loader = () => {
    return (

        <div className="loader-container"> {/* Add centering container */}
            <div className="typewriter">
                {/* Loader elements */}
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
        </div>
    );
}

export default Loader;
