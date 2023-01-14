import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleNameInput = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionInput = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description
        });
    };

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text" className="form__input form__input_type_name"
                name="name" id="name-input"
                placeholder="Введите имя:"
                minLength="2" maxLength="40"
                value={name}
                onChange={handleNameInput}
                required />
            <span className="form__input-error name-input-error"></span>
            <input
                type="text" className="form__input form__input_type_job"
                name="about" id="job-input"
                placeholder="Введите информацию о себе:"
                minLength="2" maxLength="200"
                value={description}
                onChange={handleDescriptionInput}
                required />
            <span className="form__input-error job-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;