export const validateForm = async (form) => {
    const errors = {};

    const trimmedForm = {};
    for (const key in form) {
        trimmedForm[key] = form[key] ? form[key].toString().trim() : '';
    }

    // Validate title
    if (!trimmedForm.title) {
        errors.title = 'Title is required.';
    } else if (trimmedForm.title.length < 3) {
        errors.title = 'The title must be at least 3 characters.';
    } else if (trimmedForm.title.length > 200) {
        errors.title = 'The title cannot be more than 200 characters.';
    }

    // Validate dorama
    if (!trimmedForm.dorama) {
        errors.dorama = 'Drama is required.';
    }

    // Validate photo URL
    if (!trimmedForm.photo) {
        errors.photo = 'Photo URL is required.';
    } else if (!isPhotoURLValid(trimmedForm.photo)) {
        errors.photo = 'The photo URL is invalid or it is not a valid photo.';
    }

    // Validate video URL
    if (!trimmedForm.link) {
        errors.link = 'The video URL is required.';
    } else if (!isVideoURLValid(trimmedForm.link)) {
        errors.link = 'The video URL is invalid or it is not a valid video.';
    }


    // Validate chapter
    if (!trimmedForm.chapter) {
        errors.chapter = 'The chapter is required.';
    } else if (trimmedForm.chapter.length < 3) {
        errors.chapter = 'The chapter must be at least 3 characters.';
    } else if (trimmedForm.chapter.length > 50) {
        errors.chapter = 'The chapter cannot be more than 500 characters.';
    }

    return errors;
};

// Validate photo URL
const isPhotoURLValid = (url) => {
    const photoUrlPattern = /\.(jpg|jpeg|png|gif)$/i;
    return photoUrlPattern.test(url);
};

// YouTube video URL pattern
const isVideoURLValid = (url) => {
    const videoUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\n\s]{11})$/;
    return videoUrlPattern.test(url);
};


