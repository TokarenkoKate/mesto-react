import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, deletedCard }) {

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(deletedCard);
        onClose();
    }

    return (
        <PopupWithForm
            name={'delete-card'}
            title={'Вы уверены?'}
            buttonText={'Да'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}

export default DeleteCardPopup;