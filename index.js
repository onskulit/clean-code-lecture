// Создание элемента

const elementCreator = (elem, classNames, child, parent) => {
    if (elem) {
        const element = document.createElement(elem);

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
    }
};

// Валидация

const ONE = 1;
const FIVE = 5;
const MAN_I_AM_DEAD = true;
let formIsValid = false;

const validateForm = () => {
    const validate = (type, value) => {
        switch (type) {
            case 'name':
                const regexName = /[а-яё]/i;
                if (!value) {
                    return 'Введите имя';
                } else if (!regexName.test(value)) {
                    return 'Имя должно содержать только буквы русского алфавита';
                }
                break;
            case 'surname':
                const regexSurname = /[а-яё]/i;
                if (!value) {
                    return 'Введите фамилию';
                } else if (!regexSurname.test(value))
                    return `Фамилия должна содержать только буквы русского алфавита`;

                break;
            case `grade`:
                if (!value || value > FIVE || value < ONE || !parseInt(value)) {
                    if (!value) {
                        return 'Введите оценку';
                    } else if (!parseInt(value)) {
                        return `Оценка должна быть цифрой от 1 до 5`;
                    } else if (value > 5)
                        return 'Оценка не должна быть больше 5';
                    else if (value < 1) {
                        return 'Оценка не должна быть меньше 1';
                    }
                }
        }
    };

    const nameInput = document.querySelector('input[name="name"]');
    const surnameInpt = document.querySelector('input[name="surname"]');
    const gradeInput = document.querySelector('input[name="grade"]');

    const nameContainer = document.getElementById('name-container');
    const surnameContainer = document.getElementById('surname-container');
    const gradeContainer = document.getElementById('grade-container');

    const containers = [nameContainer, surnameContainer, gradeContainer];
    for (let i = 0; i < containers.length; i++) {
        const error = containers[i].querySelector('.error');
        if (error) {
            error.remove();
        }
    }

    const nameValue = nameInput.value;
    const surnameValue = surnameInpt.value;
    const gradeValue = gradeInput.value;

    const nameErr = validate('name', nameValue);
    if (nameErr) {
        elementCreator('p', 'error', nameErr, nameContainer);
    }
    const surnameErr = validate('surname', surnameValue);
    if (surnameErr) {
        elementCreator('p', 'error', surnameErr, surnameContainer);
    }
    const gradeErr = validate('grade', gradeValue);
    if (gradeErr) {
        elementCreator('p', 'error', gradeErr, gradeContainer);
    }

    if (nameErr || surnameErr || gradeErr) {
        formIsValid = false;
    } else {
        formIsValid = true;
    }
};

// Точка входа в программу

const getList = () => {
    return document.getElementById('list');
};

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    validateForm();

    if (!formIsValid) {
        return;
    }

    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    var gradeInput = document.querySelector('input[name="grade"]');
    var list = getList();

    const name = nameInput.value;
    let surname = surnameInput.value;
    const grade = gradeInput.value;

    const isNotGoodGrade = grade < 3;

    const item = elementCreator(
        'li',
        [
            'list-item',
            isNotGoodGrade === true ? `list-item_yellow` : undefined,
        ].filter((c) => Boolean(c)),
        undefined,
        list,
    );
    item.textContent = name + ' ' + surname + ' - ' + grade;

    nameInput.value = ``;
    surnameInput.value = '';
    gradeInput.value = '';
});
