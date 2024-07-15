import PropTypes from "prop-types";
import "./FormButton.css";

function FormButton({ type, label, onClick = null, disabled = false, buttonType }) {
  return (
    <button
      className={`formButton ${buttonType}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonType: PropTypes.string.isRequired,
};

export default FormButton;
