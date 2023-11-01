// Создание элемента

const createElement = (tag, classNames, child, parent) => {
    if (!tag) {
        return;
    }

    const element = document.createElement(tag);

    if (classNames) {
        if (Array.isArray(classNames)) {
            element.classList.add(...classNames);
        } else if (typeof classNames === 'string') {
            element.classList.add(classNames);
        }
    }

    if (child) {
        element.append(child);
    }

    if (parent) {
        parent.append(element);
    }

    return element;
};

// Валидация

const MIN_GRADE = 1;
const MAX_GRADE = 5;
let isFormValid = false;

const validateForm = () => {
    const validate = (type, value) => {
        const russianLettersRegex = /[а-яё]/i;

        switch (type) {
            case 'name': {
                if (!value) {
                    return 'Введите имя';
                }
                if (!russianLettersRegex.test(value)) {
                    return 'Имя должно содержать только буквы русского алфавита';
                }
                break;
            }
            case 'surname': {
                if (!value) {
                    return 'Введите фамилию';
                }
                if (!russianLettersRegex.test(value)) {
                    return `Фамилия должна содержать только буквы русского алфавита`;
                }

                break;
            }
            case `grade`: {
                if (!value) {
                    return 'Введите оценку';
                }
                const gradeNumber = parseInt(value, 10);
                if (!gradeNumber) {
                    return `Оценка должна быть цифрой от ${MIN_GRADE} до ${MAX_GRADE}`;
                }
                if (gradeNumber > MAX_GRADE) return `Оценка не должна быть больше ${MAX_GRADE}`;
                if (gradeNumber < MIN_GRADE) {
                    return `Оценка не должна быть меньше ${MIN_GRADE}`;
                }
                break;
            }

            default:
                return undefined;
        }
    };

    const nameInput = document.querySelector('input[name="name"]');
    const surnameInpt = document.querySelector('input[name="surname"]');
    const gradeInput = document.querySelector('input[name="grade"]');

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

    const name = nameInput.value;
    const surname = surnameInpt.value;
    const grade = gradeInput.value;

    const nameError = validate('name', name);
    if (nameError) {
        createElement('p', 'error', nameError, nameContainer);
    }
    const surnameError = validate('surname', surname);
    if (surnameError) {
        createElement('p', 'error', surnameError, surnameContainer);
    }
    const gradeError = validate('grade', grade);
    if (gradeError) {
        createElement('p', 'error', gradeError, gradeContainer);
    }

    isFormValid = !(nameError || surnameError || gradeError);
};

// Точка входа в программу

const getList = () => document.getElementById('list');

const ACCEPTABLE_GRADE = 3;

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    validateForm();

    if (!isFormValid) {
        return;
    }

    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    const gradeInput = document.querySelector('input[name="grade"]');
    const list = getList();

    const name = nameInput.value;
    const surname = surnameInput.value;
    const grade = gradeInput.value;

    const isBadGrade = grade < ACCEPTABLE_GRADE;

    const item = createElement(
        'li',
        ['list-item', isBadGrade ? `list-item_yellow` : undefined].filter((className) => Boolean(className)),
        undefined,
        list
    );
    item.textContent = `${name} ${surname} - ${grade}`;

    nameInput.value = ``;
    surnameInput.value = '';
    gradeInput.value = '';
});
