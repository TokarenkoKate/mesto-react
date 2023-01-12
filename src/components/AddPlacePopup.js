import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddNewPlace({
            name,
            link
        });
        onClose();
        setName('');
        setLink('');
    }

    function handleNameInput(e) {
        setName(e.target.value);
    }

    function handleLinkInput(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm 
            name = {'add-card'} 
            title = {'Новое место'} 
            buttonText = {'Создать'} 
            isOpen = {isOpen} 
            onClose = {onClose}
            onSubmit = {handleSubmit}
        >
            <input
                type="text" className="form__input form__input_type_place-name"
                name="name" id="place-name-input"
                placeholder="Название"
                minLength="2" maxLength="30" 
                value={name}
                onChange={handleNameInput}
                required />
            <span className="form__input-error place-name-input-error"></span>
            <input 
                type="url" 
                className="form__input form__input_type_link"
                name="link" id="link-input"
                placeholder="Ссылка на картинку" 
                value={link}
                onChange={handleLinkInput}
                required />
            <span className="form__input-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;