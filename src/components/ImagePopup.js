function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_open-image ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__image-wrapper">
                <img src={card.link} alt={card.name} className="popup__image" />
                <p className="popup__image-caption">{card.name}</p>
                <button className="popup__close-button page__link-opacity" type="button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;