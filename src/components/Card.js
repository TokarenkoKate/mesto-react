function Card({card, onCardClick}) {
    return (
        <li className="card">
            <img src={card.link} alt={card.name} className="card__image" onClick={() => onCardClick(card)} />
            <div className="card__row">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-wrapper">
                    <button className="card__like" type="button"></button>
                    <p className="card__like-count">{card.likes?.length}</p>
                </div>
            </div>
            <button className="card__delete page__link-opacity" type="button"></button>
        </li>
    )
}

export default Card;