
import { Link } from 'react-router-dom'
import facebook from '../../../assets/facebook.png';
import instagram from '../../../assets/instagram.png';
import linkedin from '../../../assets/linkedin.png';
import whatsapp from '../../../assets/whatsapp.png';
import styles from './Networks.module.css';

function Networks() {
  let networkData = [
    {
      to: 'https://www.facebook.com/janet.calderon.969',
      name: 'Facebook',
      icon: facebook,
    },
    {
      to: 'https://www.instagram.com/janetcald/',
      name: 'Instagram',
      icon: instagram,
    },
    {
      to: 'https://www.linkedin.com/in/janet-calderon-559ab6240/',
      name: 'LinkedIn',
      icon: linkedin,
    },
    { 
      to: 'https://wa.me/543415086762',
      name: 'WhatsApp',
      icon: whatsapp,
    },
  ];

  return (
    <ul className={styles.network}>
      {networkData.map((network, key) => (
        <li className={styles.networkItem} key={key}>
          <Link to={network.to} target='_blank' rel='noopener noreferrer'>
            <img className={styles.item} src={network.icon} alt={network.name} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Networks;