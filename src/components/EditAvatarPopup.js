import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const userAvatar = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdateAvatar({
            avatar: userAvatar.current.value
        });
        onClose();
        userAvatar.current.value = '';
    };

    return (
        <PopupWithForm 
            name={'edit-avatar'} 
            title={'Обновить аватар'} 
            buttonText={'Сохранить'} 
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                ref={userAvatar}
                type="url" className="form__input form__input_type_avatar"
                name="avatar" id="avatar-input"
                placeholder="Введите ссылку на новый аватар:" required />
            <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup