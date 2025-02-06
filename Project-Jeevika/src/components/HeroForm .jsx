import React from 'react';
import "../components/ui/HeroForm.css"
const HeroForm = () => {
    return (
       
        <div className="card">
            <span className="card__title">Connect, Hire, and Grow!</span>
            <p className="card__content">
            Jeevika bridges the gap between small businesses and skilled professionals, making hiring seamless and efficient. 🚀
            </p>
            <form className="card__form" action='https://formspree.io/f/xrbelqzk' method='post'>

                <input required="" name='Number' type="number" placeholder="Your Number" />
                <button className="card__button" type='submit'>JOIN US </button>
            </form>
        </div>

    );
}

export default HeroForm;
