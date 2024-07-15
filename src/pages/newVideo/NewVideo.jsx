import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../../contexts/VideoContext"
import { validateForm } from "../../utils/ValidateForm";
import "./NewVideo.css"
import Warning from "../../components/warning/Warning";
import ListDoramas from "../../components/listDoramas/ListDoramas";
import doramaData from "../../data/DoramaData";
import FormButton from "../../components/formButton/FormButton";
import ConfirmationMessage from "../../components/confirmationMessage/ConfirmationMessage";

function NewVideo () {
  const { addVideo } = useVideoContext();
  const navigate = useNavigate();
  
  const initialForm = {
    title: '',
    dorama: '',
    photo: '',
    link: '',
    chapter: '',
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [insertedFields, setInsertedFields] = useState ({
    title: false,
    dorama: false,
    photo: false,
    link: false,
    chapter: false,
  });

  const [ButtonDisabled, setButtonDisabled] = useState(true);
  const chapterRef = useRef(null);
  
  const [viewWarning, setViewWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [viewConfirmation, setViewConfirmation] = useState(false);
  

  const validateFormAndSetErrors = useCallback( async () => {
    const formErrors = await validateForm(form);
    setErrors(formErrors);
    setButtonDisabled(Object.keys(formErrors).length > 0 || !formFilled(form));
    }, [form]);

    useEffect(() => {
      validateFormAndSetErrors ();
    }, [form, validateFormAndSetErrors]); 
  
  const formFilled = (form) => {
    return (
      form.title.trim() !== '' &&
      form.dorama.trim() !== '' &&
      form.photo.trim() !== '' &&
      form.link.trim() !== '' &&
      form.chapter.trim() !== ''
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  };

  const handleFieldBlur = (field) => {
    setInsertedFields({...insertedFields,[field]: true});
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await validateFormAndSetErrors();
    if (formFilled(form) && Object.keys(errors).length === 0) {
      
      setViewConfirmation(true);
    }
  };
  
  const handleConfirmSave = async () => {
    try {
      await addVideo(form);
      setWarningMessage("The video has been saved successfully.");
      setViewConfirmation(false);
      setViewWarning(true);
    
      setTimeout(() => {
      setViewWarning(false);
      navigate('/');
      }, 3000);
    } catch (error){
      console.error('Error saving video:', error);
    }
  };

  const handleCancelSave = () => {
    setViewConfirmation(false);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
    setInsertedFields({
      title: false,
      dorama: false,
      photo: false,
      link: false,
      chapter: false,
    });
    
  };

  return (
    <div className="newVideo">
      <div className="newVideoContainer">
        <header className="newVideoHeader">
          <h1 className="newVideoTitle">NEW VIDEO</h1>
          <p className="newVideoDescription">COMPLETE THE FORM TO CREATE A NEW VIDEO CARD</p>
        </header>
        <form className="newVideoForm" onSubmit={handleSave}>
          <div className="formSection">
            <div className="sectionOne">
              <h2 className="sectionOneTitle">CREATE CARD</h2>
            </div>
          </div>
          <div className="formSection">
            <div className="sectionOne">
              <label className={`newVideoFormLabel ${errors.title && insertedFields.title ? 'errorLabel' : '' }`}>
                Title:
                <input 
                  className={`newVideoFormInput ${errors.title && insertedFields.title ? 'error' : ''}`}
                  type="text"
                  placeholder="Enter video title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  onBlur={() => handleFieldBlur('title')}
                  maxLength="200"
                  required
                />
                {errors.title && insertedFields.title && (<span className="errorMessage">{errors.title}</span>)}
              </label>
            </div>
            <div className="sectionTwo">
              <ListDoramas
                class1={`newVideoFormInput newVideoFormList ${errors.dorama && insertedFields.dorama ? 'errorLabel' : ''}`}
                class2='newVideoDropdownList'
                class3='newVideoAditionalClass3'
                class4='newVideoAditionalClass4'
                value={form.dorama}
                onChange={(e) => {
                  handleChange({ target: { name: 'dorama', value: e.target.value },});
                  handleFieldBlur('dorama');
                }}
                options={doramaData}
              />
              {errors.dorama && insertedFields.dorama && (<span className="errorMessage">{errors.dorama}</span>)}
            </div>
          </div>
          <div className="formSection">
            <div className="sectionOne">
              <label className={`newVideoFormLabel ${errors.photo && insertedFields.photo ? 'errorLabel' : ''}`}>
                Image:
                <input
                  className={`newVideoFormInput ${errors.photo && insertedFields.photo ? 'error' : ''}`}
                  type="url"
                  placeholder="Enter image link"
                  name="photo"
                  value={form.photo}
                  onChange={handleChange}
                  onBlur={() => handleFieldBlur('photo')}
                  maxLength="200"
                  required
                />
                {errors.photo && insertedFields.photo && (<span className="errorMessage">{errors.photo}</span>)}
              </label>
            </div>
            <div className="sectionTwo">
              <label className={`newVideoFormLabel ${errors.link && insertedFields.link ? 'errorLabel' : ''}`}>
                Video:
                <input
                  className={`newVideoFormInput ${errors.link && insertedFields.link ? 'error' : ''}`}
                  type="url"
                  placeholder='Enter video link'
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  onBlur={() => handleFieldBlur('link')}
                  maxLength="200"
                  required
                />
                {errors.link && insertedFields.link && (<span className="errorMessage">{errors.link}</span>)}
              </label>
            </div>
          </div>
          <div className="formSection">
            <div className="sectionOne">
              <label className={`newVideoFormLabel ${errors.chapter && insertedFields.chapter ? 'errorLabel' : ''}`}>
                Chapter:
                <input
                  className={`newVideoFormInput ${errors.chapter && insertedFields.chapter ? 'error' : ''}`}
                  name="chapter"
                  placeholder='What episode is it?'
                  value={form.chapter}
                  onChange={handleChange}
                  onBlur={() => handleFieldBlur('chapter')}
                  ref={chapterRef}
                  maxLength="20"
                  required
                />
                {errors.chapter && insertedFields.chapter && (<span className="errorMessage">{errors.chapter}</span>)}
              </label>
            </div>
          </div>
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
      {viewWarning && (
        <Warning 
          message={warningMessage}
          onClose={() => setViewWarning(false)}
        />
      )}
      {viewConfirmation && (
        <ConfirmationMessage
          message={`Are you sure you want to save this new video?`}
          onConfirm={handleConfirmSave}
          onCancel={handleCancelSave}
        />
      )}
    </div>
  );
}

export default NewVideo