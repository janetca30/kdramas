import styles from "./Card.module.css"
import PropTypes from "prop-types"
import garbage from "../../assets/garbage.png"
import pencil from "../../assets/pencil.png"

function Card ({ data, doramaColor, onClick, onDelete, onEdit }) {

  const { photo, title } = data;

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(data);
  };

  return (
    <div className={styles.cardContainer} style={{backgroundColor: doramaColor}} onClick={onClick}>
      <figure className={styles.figure} >
        <img src={photo} alt={title}  className={styles.cardImage}/>
        <figcaption className={styles.figcaption} >
          <div className={styles.remove} onClick={handleDelete}>
            <img src={garbage} alt="garbage" className={styles.garbage}/>
            <span>REMOVE</span>
          </div>
          <div className={styles.edit} onClick={handleEdit}>
            <img src={pencil} alt="pencil" className={styles.pencil}/>
            <span>EDIT</span>
          </div>
        </figcaption>
      </figure>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.shape({
      photo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  doramaColor: PropTypes.string.isRequired,
};

export default Card