import { useState } from "react";
import PropTypes from 'prop-types';
import Card from "../card/Card";
import Warning from "../warning/Warning"
import ConfirmationMessage from "../confirmationMessage/ConfirmationMessage"
import styles from "./Dorama.module.css"

function Dorama ({ data, cards, cardOnClick, cardOnDelete, cardOnEdit}) {

  const { name, doramaColor } = data;
  const [viewWarning, setViewWarning] = useState(false);
  const [messageWarning, setMessageWarning] = useState("");
  const [viewConfirmation, setViewConfirmation] = useState(false);
  const [deleteCard, setDeleteCard] = useState(null);

  const handleDelete = (cardId, cardTitle) => {
    setDeleteCard({ id: cardId, title: cardTitle });
    setViewConfirmation(true)
  };

  const deleteConfirmation = () => {
    if (deleteCard) {
      cardOnDelete(deleteCard.id);
      setMessageWarning(`"${deleteCard.title}" Was delected correctly.`);
      setViewWarning(true);
      setTimeout(()=>{
        setViewWarning(false);
        setMessageWarning('');
      }, 3000);
      setViewConfirmation(false);
      setDeleteCard(null);
    }
  };

  const deleteCancel = () => {
    setViewConfirmation(false);
    setDeleteCard(null)
  }

  const colorTitleStyle = {
    backgroundColor: doramaColor,
  };

  return(
    <>
      {viewWarning && 
      <Warning 
        message={messageWarning} 
        onClose={() => setViewWarning(false)} /> }
        {viewConfirmation && (
          <ConfirmationMessage 
            message={`Are you sure you want to delete? "${deleteCard?.title}"?`}
            title={deleteCard?.title}
            doramaColor={doramaColor}
            onConfirm={deleteConfirmation}
            onCancel={deleteCancel} />
        )}
          {cards && cards.length > 0 && (
            <section className={styles.dorama}>
              <h4 className={styles.title} style={colorTitleStyle}>{name}</h4>
              <div className={styles.container}>
                {cards.map((card) => (
                  <Card 
                    data={card} 
                    key={card.id}
                    doramaColor={doramaColor}
                    onClick={() => cardOnClick(card)}
                    onDelete={() => handleDelete(card.id, card.title)}
                    onEdit={() => cardOnEdit(card)}
                      />
                    ))}
                  </div>
                </section>
              )}
    </>
  )
}

Dorama.propTypes = {
  data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      doramaColor: PropTypes.string.isRequired,
  }).isRequired,
  cards: PropTypes.arrayOf(
      PropTypes.shape({
          photo: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
      })
  ).isRequired,
  cardOnClick: PropTypes.func.isRequired,
  cardOnDelete: PropTypes.func.isRequired,
  cardOnEdit: PropTypes.func.isRequired,
};

export default Dorama;