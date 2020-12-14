const template = `
    <div class="radio-group">
        <label class="radio-group__label">$title$</label>
        <div class="radio-group__list">$list$</div>
    </div>
`;

/**
 * Возвращает html-элемент в виде строки
 *
 * @param object
 * @returns {string}
 */
function getElement(object) {
    let list = '';
    object.data.list.forEach((el) => {
        list += `
            <div class="radio-group__item">
                <input type="radio" id="rb-${el.name}" name="${object.data.name}" value="${el.name}"
                       ${el.checked ? 'checked' : ''}>
                <label class="radio-group__title" for="rb-${el.name}"><p>${el.title}</p></label>
                <span class="radio-group__box"></span>
            </div>
        `;
    });

    let html = template.replaceAll('$title$', object.data.title);
    html = html.replaceAll('$list$', list);
    return html;
}

const radioGroup = {
    node: null,
    type: 'checkbox-list',
    data: {
        list: [
            { name: 'male', title: 'Мужчина', checked: true },
            { name: 'female', title: 'Женщина', checked: false },
        ],
        name: 'sex',
        title: 'Radio buttons',
    },

    getElement,
};

export default radioGroup;
