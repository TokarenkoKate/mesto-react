import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cardsList, setCardsList] = useState([]);
    const [currentUser, setCurrentUser] = useState({ name: 'Загрузка...', about: 'Загрузка...' });
    const [isLoading, setIsLoading] = useState(true);
    const [deletedCard, setDeletedCard] = useState({});

    useEffect(() => {
        Promise.all([
            api.getUserInfo()
                .then((userData) => setCurrentUser(userData))
                .catch(err => console.log(err.message))
                .finally(() => setIsLoading(false)),
            api.getInitialCards()
                .then(cards => setCardsList(cards))
                .catch(err => console.log(err.message))
        ])
    }, [])

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleDeleteCardClick(card) {
        setIsDeleteCardPopupOpen(true);
        setDeletedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCardsList((cardList) => cardList.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCardsList(cardsList.filter((currentCard) => currentCard._id !== card._id));
            })
            .catch((err) => console.log(err))
            .finally(() => setDeletedCard({}));
    }

    function handleUpdateUser(userData) {
        api.editUserInfo(userData)
            .then((data) => setCurrentUser(data))
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(userAvatar) {
        api.editUserAvatar(userAvatar)
            .then((data) => setCurrentUser(data))
            .catch((err) => console.log(err))
    }

    function handleAddNewPlace(newCard) {
        api.addNewCard(newCard)
            .then((card) => setCardsList([card, ...cardsList]))
            .catch((err) => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header />
                    <Main
                        cardsList={cardsList}
                        setCardsList={setCardsList}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        isLoading={isLoading}
                        onCardDelete={handleDeleteCardClick}
                    />
                    <Footer />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddNewPlace={handleAddNewPlace}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    />

                    <DeleteCardPopup
                        isOpen={isDeleteCardPopupOpen}
                        onClose={closeAllPopups}
                        onDeleteCard={handleCardDelete}
                        deletedCard={deletedCard}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;