import { useEffect, useState } from "react";
import { useVideoContext } from "../../contexts/VideoContext";
import FormCard from "../../components/formCard/FormCard";
import Banner from "../../components/banner/Banner";
import Container from "../../components/container/Container";
import Dorama from "../../components/dorama/Dorama";
import doramaData from "../../data/DoramaData";
import Loading from "../../components/loading/Loading";

function Home() {
  const { videos, deleteVideo, updateVideo } = useVideoContext();
  const [doramas, setDoramas] = useState([]);
  const [bannerCard, setBannerCard] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [cardCurrent, setCardCurrent] = useState(null);
  const [doramaLookup, setDoramaLookup] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDoramas(doramaData);
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      setBannerCard(videos[0]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [videos]);

  useEffect(() => {
    const lookup = {};
    doramas.forEach((dorama) => {
      lookup[dorama.name] = dorama;
    });
    setDoramaLookup(lookup);
  }, [doramas]);

  const handleCardClick = (card) => {
    setBannerCard(card);
    const bannerElement = document.getElementById('banner');
    if (bannerElement) {
      bannerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardDelete = (cardId) => {
    deleteVideo(cardId);
    if (bannerCard && bannerCard.id === cardId && videos.length > 0) {
      setBannerCard(videos[0]);
    } else if (videos.length === 0) {
      setBannerCard(null);
    }
  };

  const handleCardEdit = (card) => {
    setCardCurrent(card);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormSave = (updatedCard) => {
    updateVideo(updatedCard);
    setFormOpen(false);
  };

  return (
    isLoading ?
      <Loading /> : 
    <Container>
      {bannerCard && <Banner card={bannerCard} doramaLookup={doramaLookup} />}
      {doramas.map(dorama => (
        <Dorama
          key={dorama.id}
          data={dorama}
          cards={videos.filter(card => card.dorama === dorama.name)}
          cardOnClick={handleCardClick}
          cardOnDelete={handleCardDelete}
          cardOnEdit={handleCardEdit}
        />
      ))}
      <FormCard
        card={cardCurrent}
        isOpen={formOpen}
        onClose={handleFormClose}
        onSave={handleFormSave}
      />
    </Container>
  );
}

export default Home;
