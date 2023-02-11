import React from "react";

const PopupWithForm = (props) => {

  const { name, title, children, submitBtnText, isOpen, onClose, onSubmit } = props;
  return (

    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <div className="popup__content">
          <button className="popup__close" type="button" id={`${name}-close`} onClick={onClose} />
          <form
            className="popup__form"
            name={name}
            id={name}
            onSubmit={onSubmit}
          >
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className="popup__submit-btn" type="submit">
              {submitBtnText}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default PopupWithForm;