export const clearValidationErrors = () => {
    const nameContainer = document.getElementById('name-container');
    const surnameContainer = document.getElementById('surname-container');
    const gradeContainer = document.getElementById('grade-container');

    [nameContainer, surnameContainer, gradeContainer].forEach((container) => {
        const error = container.querySelector('.error');
        if (error) {
            error.remove();
        }
    });
};
