// Element creation

const createElement = ({ tag, classNames, child, parent }) => {
    if (!tag) {
        return;
    }

    const element = document.createElement(tag);

    if (classNames) {
        if (Array.isArray(classNames)) {
            element.classList.add(...classNames);
        } else if (typeof classNames === 'string')
            element.classList.add(classNames);
    }

    if (child) {
        if (Array.isArray(child)) {
            child.forEach((childElem) => {
                element.append(childElem);
            });
        } else if (typeof child === 'string') {
            element.innerHTML = child;
        } else {
            element.append(child);
        }
    }

    if (parent) {
        parent.append(element);
    }

    return element;
};

// Validation

const MIN_GRADE = 1;
const MAX_GRADE = 5;

const validateName = (name) => {
    const russianLettersRegex = /[а-яё]/i;
    if (!name) {
        return 'Введите имя';
    }
    if (!russianLettersRegex.test(name)) {
        return 'Имя должно содержать только буквы русского алфавита';
    }
};

const validateSurname = (surname) => {
    const russianLettersRegex = /[а-яё]/i;
    if (!surname) {
        return 'Введите фамилию';
    }
    if (!russianLettersRegex.test(surname)) {
        return 'Фамилия должна содержать только буквы русского алфавита';
    }
};

const validateGrade = (grade) => {
    if (!grade) {
        return 'Введите оценку';
    }
    if (!parseInt(grade)) {
        return 'Оценка должна быть цифрой от 1 до 5';
    }
    if (grade > MAX_GRADE) {
        return 'Оценка не должна быть больше 5';
    }
    if (grade < MIN_GRADE) {
        return 'Оценка не должна быть меньше 1';
    }
};

const clearValidationErrors = () => {
    const nameContainer = document.getElementById('name-container');
    const surnameContainer = document.getElementById('surname-container');
    const gradeContainer = document.getElementById('grade-container');

    const containers = [nameContainer, surnameContainer, gradeContainer];
    for (let i = 0; i < containers.length; i += 1) {
        const error = containers[i].querySelector('.error');
        if (error) {
            error.remove();
        }
    }
};

const showValidationError = ({ nameError, surnameError, gradeError }) => {
    const nameContainer = document.getElementById('name-container');
    const surnameContainer = document.getElementById('surname-container');
    const gradeContainer = document.getElementById('grade-container');

    if (nameError) {
        createElement({
            tag: 'p',
            classNames: 'error',
            child: nameError,
            parent: nameContainer,
        });
    }
    if (surnameError) {
        createElement({
            tag: 'p',
            classNames: 'error',
            child: surnameError,
            parent: surnameContainer,
        });
    }
    if (gradeError) {
        createElement({
            tag: 'p',
            classNames: 'error',
            child: gradeError,
            parent: gradeContainer,
        });
    }
};

const validateForm = ({ name, surname, grade }) => {
    clearValidationErrors();

    const nameError = validateName(name);
    const surnameError = validateSurname(surname);
    const gradeError = validateGrade(grade);

    showValidationError({ nameError, surnameError, gradeError });

    return !(nameError || surnameError || gradeError);
};

// Create list item

const createListItem = ({ name, surname, grade }) => {
    const list = document.getElementById('list');

    const isBadGrade = grade < 3;

    const classNames = [
        'list-item',
        isBadGrade === true ? 'list-item_yellow' : undefined,
    ].filter((className) => Boolean(className));

    const item = createElement({
        tag: 'li',
        classNames,
        parent: list,
    });
    item.textContent = `${name} ${surname} - ${grade}`;
};

// Form

const getFormValues = () => {
    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    const gradeInput = document.querySelector('input[name="grade"]');

    const name = nameInput.value;
    const surname = surnameInput.value;
    const grade = gradeInput.value;

    return { name, surname, grade };
};

const clearFormInputs = () => {
    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    const gradeInput = document.querySelector('input[name="grade"]');

    nameInput.value = '';
    surnameInput.value = '';
    gradeInput.value = '';
};

// Entry point

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const { name, surname, grade } = getFormValues();

    const isFormValid = validateForm({
        name,
        surname,
        grade,
    });

    if (!isFormValid) {
        return;
    }

    createListItem({ name, surname, grade });

    clearFormInputs();
});
