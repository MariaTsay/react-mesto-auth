import React from "react";
import iconSuccess from "../images/icon__success.svg";
import iconFail from "../images/icon__fail.svg";

const InfoTooltip = (props) => {
    const {name, status, isOpen, onClose } = props;

    const text = status === 'success' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
    const icon = status === 'success' ? iconSuccess : iconFail;

    return(
    <section className={`popup popup_type_status ${isOpen ? 'popup_opened' : ''}`} >
        <div className="popup__container">
          <div className="popup__content">
            <button className="popup__close" type="button" id={`${name}-close`} onClick={onClose} />
            <form
            className="popup__form"
            name={name}
            id={name}
          >
            <img className="popup__infotool-image" src={icon} alt={status}/>
            <p className="popup__infotool-text">{text}</p>

          </form>
          </div>
        </div>
    </section>
    )
}

export default InfoTooltip;