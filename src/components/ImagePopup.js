import React from "react";

const ImagePopup = (props) => {
  const { card, onClose, isOpen } = props;
  return (
    <section className={`popup popup_type_photo ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__content">
          <button className="popup__close" type="button" onClick={onClose} />
          <figure className="popup__fullscreen-form">
            <img
              className="popup__fullscreen-image"
              src={card.link}
              alt={card.name}
            />
            <figcaption className="popup__description">
              {card.name}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default ImagePopup;