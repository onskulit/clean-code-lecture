import { createElement } from '../../../shared/utils/createElement';

export const createListItem = ({ name, surname, grade }) => {
    const list = document.getElementById('list');

    const isBadGrade = grade < 3;
    const listItemClasses = [
        'list-item',
        isBadGrade ? 'list-item_yellow' : undefined,
    ].filter((className) => Boolean(className));

    const item = createElement('li', {
        classNames: listItemClasses,
        child: undefined,
        parent: list,
    });
    item.textContent = `${name} ${surname} - ${grade}`;
};
