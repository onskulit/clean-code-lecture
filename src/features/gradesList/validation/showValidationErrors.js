import { createElement } from '../../../shared/utils/createElement';

export const showValidationErrors = ({
    nameError,
    surnameError,
    gradeError,
}) => {
    const nameContainer = document.getElementById('name-container');
    const surnameContainer = document.getElementById('surname-container');
    const gradeContainer = document.getElementById('grade-container');

    if (nameError) {
        createElement('p', {
            classNames: 'error',
            child: nameError,
            parent: nameContainer,
        });
    }
    if (surnameError) {
        createElement('p', {
            classNames: 'error',
            child: surnameError,
            parent: surnameContainer,
        });
    }
    if (gradeError) {
        createElement('p', {
            classNames: 'error',
            child: gradeError,
            parent: gradeContainer,
        });
    }
};
