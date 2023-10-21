export const createElement = (tag, { classNames, child, parent }) => {
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
