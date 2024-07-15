import { useState } from "react";
import PropTypes from 'prop-types';
import styles from "./Banner.module.css";
import cerezo from "../../assets/cerezo.jpg";
import ReactPlayer from "react-player";

function Banner({ card, doramaLookup }) {
  const [seeDescription, setSeeDescription] = useState(false);

  if (!card || !card.dorama || !doramaLookup || !doramaLookup[card.dorama]) {
    return null;
  }

  const { title, link, chapter } = card;
  const { name, doramaColor } = doramaLookup[card.dorama];

  const colorTitleStyle = {
    backgroundColor: doramaColor,
  }

  const toggleDescription = () => {
    setSeeDescription(!seeDescription);
  };

  return (
    <div id="banner" className={styles.banner} style={{ backgroundImage: `url(${cerezo})` }}>
      <div className={styles.gradient}></div>
      <section className={styles.container}>
        <h2 className={styles.name} style={colorTitleStyle}>{name}</h2>
        <h3 className={styles.title}>Favorite Doramas</h3>
        <p className={styles.sub}>A guide to watching recently aired dramas without advertising</p>
        <button className={styles.button} onClick={toggleDescription}>
          {seeDescription ? "Hide out" : "See more"}
        </button>
        {seeDescription && (
          <div className={styles.description}>
            <h3 className={styles.titleDescription}>{title}</h3>
            <p className={styles.subDescription}>{chapter}</p>
          </div>
        )}
      </section>
      <section className={styles.containerVideo}>
        <ReactPlayer
          className={styles.video}
          url={link}
          title={title}
          controls
        />
      </section>
    </div>
  );
}

Banner.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    dorama: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    chapter: PropTypes.string.isRequired,
  }).isRequired,
  doramaLookup: PropTypes.object.isRequired,
};

export default Banner;
