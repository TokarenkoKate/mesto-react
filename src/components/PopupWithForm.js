function PopupWithForm({name, title, buttonText, isOpen, onClose, children }) {
  return(
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form action="#" className={`form form_type_${name}`} name={name} noValidate>
            {children}
            <button className="form__submit-button" type="submit">{buttonText}</button>
          </form>
          <button className="popup__close-button page__link-opacity" type="button" onClick={onClose}></button>
        </div>
      </div>
  )
}

export default PopupWithForm;