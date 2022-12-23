import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('Загрузка...');
  const [userDescription, setUserDescription] = useState('Загрузка...');
  const [userAvatar, setUserAvatar] = useState('');
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    Promise.all(
      [api.getUserInfo()
        .then(userData => {
          setUserName(userData.name);
          setUserDescription(userData.about);
          setUserAvatar(userData.avatar);
        })
        .catch(err => console.log(err.message)), 
      api.getInitialCards()
        .then(cards => setCardsList(cards))
        .catch(err => console.log(err.message))
      ]
    )
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-wrapper" onClick={ onEditAvatar }>
          <img src={userAvatar} alt="Аватар" className="profile__image"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__author">{userName}</h1>
          <p className="profile__job">{userDescription}</p>
          <button 
            className="profile__edit-btn page__link-opacity" 
            type="button"
            onClick={ onEditProfile } >
          </button>
        </div>
        <button 
          className="profile__add-btn page__link-opacity" 
          type="button"
          onClick={ onAddPlace } >
        </button>
      </section>

      <section className="content" aria-label="Карточки">
        <ul className="cards">
          {cardsList.map((card) => {
            return <Card key={card._id} card={card} onCardClick={ onCardClick } />
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;