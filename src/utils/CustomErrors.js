export const errortypes = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooShort",
];

export const messages = {
    title: {
        valueMissing: "The title field cannot be empty.",
        tooShort: "The title must be at least 3 characters.",
    },
    dorama: {
        valueMissing: "Please select a drama.",
    },
    photo: {
        valueMissing: "The photo field cannot be empty.",
        typeMismatch: "Please enter a valid image URL.",
        tooShort: "Photo URL must be at least 3 characters.",
    },
    link: {
        valueMissing: "The video field cannot be empty.",
        typeMismatch: "Please enter a valid URL.",
        tooShort: "Video URL must be at least 3 characters.",
    },
    chapter: {
        valueMissing: "The chapter field cannot be empty.",
        tooShort: "The chapter must be at least 10 characters.",
    },
};
