import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <div className="page">
      <div className="page__container">
          <Header />
          <Main 
            onEditProfile={ handleEditProfileClick } 
            onAddPlace={ handleAddPlaceClick } 
            onEditAvatar={ handleEditAvatarClick } 
            onCardClick={ handleCardClick }
          />
          <Footer />

          <PopupWithForm name={'edit-profile'} title={'Редактировать профиль'} isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } >
              <input 
                type="text" className="form__input form__input_type_name" 
                name="name" id="name-input"
                placeholder="Введите имя:" 
                minLength="2" maxLength="40" required />
              <span className="form__input-error name-input-error"></span>
              <input 
                type="text" className="form__input form__input_type_job" 
                name="about" id="job-input" 
                placeholder="Введите информацию о себе:" 
                minLength="2" maxLength="200" required />
              <span className="form__input-error job-input-error"></span>
          </PopupWithForm>
          
          <PopupWithForm name={'add-card'} title={'Новое место'} isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups }>
            <input 
              type="text" className="form__input form__input_type_place-name" 
              name="name" id="place-name-input"
              placeholder="Название" 
              minLength="2" maxLength="30" required />
            <span className="form__input-error place-name-input-error"></span>
            <input type="url" className="form__input form__input_type_link" 
              name="link" id="link-input"
              placeholder="Ссылка на картинку" required />
            <span className="form__input-error link-input-error"></span>
          </PopupWithForm>

          <PopupWithForm name={'edit-avatar'} title={'Обновить аватар'} isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups }>
            <input 
              type="url" className="form__input form__input_type_avatar" 
              name="avatar" id="avatar-input"
              placeholder="Введите ссылку на новый аватар:" required />
            <span className="form__input-error avatar-input-error"></span>
          </PopupWithForm>

          <ImagePopup card={selectedCard} isOpen={ isImagePopupOpen } onClose={ closeAllPopups } />
      </div>
    </div>
  );
}

export default App;