import { useState } from "react"
import PropTypes from "prop-types"
import "./Warning.css"
import check from "../../assets/check.png"
import close from "../../assets/close.png"

const Warning = ({ message, onClose, color}) => {
  
  const [ view, setView ] = useState(true);

  const handleClose = () => {
    setView(false);
    onClose();
  }
  
  return (
    <div className={`warning ${view ? 'view' : ''}`} style={{backgroundColor: color}}>
      <div className='containerWarning'>
        <img src={check} alt="check" className='check' />
        <p>{message}</p>
        <img src={close} className='close' onClick={handleClose}/>
      </div>
    </div>
  )
}

Warning.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  color: PropTypes.string
};
Warning.defaultProps = {
  color: 'var(--white)' 
};

export default Warning