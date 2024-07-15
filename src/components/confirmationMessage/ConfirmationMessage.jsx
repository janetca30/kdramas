import PropTypes from 'prop-types';
import styles from "./ConfirmationMessage.module.css";

const ConfirmationMessage = ({ message, doramaColor, onConfirm, onCancel }) => {
    return (
        <div className={styles.confirmation}>
            <p className={styles.message}>
                {message} <span className={styles.span} style={{ color: doramaColor }}></span>
            </p>
            <button className={styles.yes} onClick={onConfirm}>Yes</button>
            <button className={styles.no} onClick={onCancel}>No</button>
        </div>
    );
};

ConfirmationMessage.propTypes = {
    message: PropTypes.string.isRequired,
    doramaColor: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmationMessage;
