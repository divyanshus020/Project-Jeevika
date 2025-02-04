import React from 'react';
import "../components/ui/HeroForm.css"
const HeroForm = () => {
    return (
       
        <div className="card">
            <span className="card__title">Connect, Hire, and Grow!</span>
            <p className="card__content">
            Jeevika bridges the gap between small businesses and skilled professionals, making hiring seamless and efficient. 🚀
            </p>
            <form className="card__form">
                <input required="" type="email" placeholder="Your life" />
                <button className="card__button">JOIN US </button>
            </form>
        </div>

    );
}

export default HeroForm;
