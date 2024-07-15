import { useEffect, useMemo, useRef, useState } from "react";
import { validateForm } from "../../utils/ValidateForm";
import PropTypes from 'prop-types';
import "./FormCard.css"
import close from "../../assets/close.png"
import doramaData from "../../data/DoramaData";
import FormButton from "../formButton/FormButton";
import ListDoramas from "../listDoramas/ListDoramas"
import ConfirmationMessage from "../confirmationMessage/ConfirmationMessage"

function FormCard ({ card, isOpen, onClose, onSave }) {
    
  const initialForm = useMemo(() => ({
        title: '',
        dorama: '',
        photo: '',
        link: '',
        chapter: '',
    }), []);

    const [form, setForm] = useState (initialForm);
    const [errors, setErrors] = useState({});
    const [ButtonDisabled, setButtonDisabled] = useState(true);
    const [confirmation, setConfirmation] = useState(false);
    const chapterRef = useRef(null);

    useEffect (() => {
      if (isOpen && card) {
        setForm({ ...card });
      } else {
        setForm(initialForm);
      }
      setErrors({});
    }, [card, isOpen, initialForm]);

    useEffect(() => {
      const validate = async () => {
        const formErrors = await validateForm(form);
          setErrors(formErrors);
          setButtonDisabled(Object.keys(formErrors).length > 0);
        };
        validate();
    }, [form]);

    if (!isOpen) return null;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value.toString() });
    };

    const handleSave = async (e) => {
      e.preventDefault();
      const formErrors = await validateForm(form);
      setErrors(formErrors);
      if (Object.keys(formErrors).length === 0) {
        setConfirmation(true);
      }
    };

    const handleConfirmSave = () => {
      onSave(form);
      setConfirmation(false);
    };

    const handleCancelSave = () => {
      setConfirmation(false);
    };

    const handleCancel = () => {
      setForm(initialForm);
      setErrors({});
      setButtonDisabled(true);
    };

    return (
        <div className="formContainer">
          <div className="container">
            <img className="imgClose" src={close} onClick={onClose} />
                <h1>EDIT CARD:</h1>
                <form className="form" 
                      onSubmit={handleSave}>
                    <label>Title:
                        <input
                            className= {`formInput ${errors.title ? 'error' : ''}`}
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            maxLength="200"
                            required
                        />
                        {errors.title && <span className="errorMessage">{errors.title}</span>}
                    </label>
                    <ListDoramas 
                        class1={`formInput formList ${errors.photo ? 'error' : ''}`}
                        class2='dropdownList'
                        class3='aditionalClass3'
                        class4='aditionalClass4'
                        value={form.dorama}
                        onChange={(e) => handleChange({ target: { name: 'dorama', value: e.target.value } })}
                        options={doramaData}
                    />
                    {errors.dorama && <span className="errorMessage">{errors.dorama}</span>}
                    <label>Image:
                        <input
                            className={`formInput ${errors.photo ? 'error' : ''}`}
                            type="url"
                            name="photo"
                            value={form.photo}
                            onChange={handleChange}
                            maxLength="200"
                            required
                        />
                        {errors.photo && <span className="errorMessage">{errors.photo}</span>}
                    </label>
                    <label>Video:
                        <input
                            className={`formInput ${errors.link ? 'error' : ''}`}
                            type="url"
                            name="link"
                            value={form.link}
                            onChange={handleChange}
                            maxLength="200"
                            required
                        />
                        {errors.link && <span className="errorMessage">{errors.link}</span>}
                    </label>
                    <label>Chapter:
                        <input
                            className={`formInput ${errors.chapter ? 'error' : ''}`}
                            name="chapter"
                            value={form.chapter}
                            onChange={handleChange}
                            ref={chapterRef}
                            maxLength="20"
                            required
                        />
                        {errors.chapter && <span className="errorMessage">{errors.chapter}</span>}
                    </label>
                    <div className="newVideoButtons">
                        <FormButton
                            type="submit"
                            label="SAVE"
                            disabled={ButtonDisabled}
                            buttonType="formButton-save"
                        />
                        <FormButton
                            type="button"
                            label="CLEAR"
                            onClick={handleCancel}
                            buttonType="formButton-cancel"
                        />
                    </div>
                </form>
            </div>
            {confirmation && (
                <ConfirmationMessage
                    message={`Are you sure you want to save the changes?`}
                    onConfirm={handleConfirmSave}
                    onCancel={handleCancelSave}
                />
            )}
        </div>
    );
}

FormCard.propTypes = {
    card: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default FormCard;