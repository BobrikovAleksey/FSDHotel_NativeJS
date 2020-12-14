const template = `
    <div class="checkbox-list">
        <label class="checkbox-list__label">$title$</label>
        <div class="checkbox-list__list">$list$</div>
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
            <div class="checkbox-list__item">
                <input type="checkbox" id="cb-${el.name}" name="${el.name}" ${el.checked ? 'checked' : ''}>
                <label class="checkbox-list__title" for="cb-${el.name}"><p>${el.title}</p></label>
                <span class="checkbox-list__box">
                    <span class="checkbox-list__check"></span>
                </span>
            </div>
        `;
    });

    let html = template.replaceAll('$title$', object.data.title);
    html = html.replaceAll('$list$', list);
    return html;
}

const checkboxList = {
    node: null,
    type: 'checkbox-list',
    data: {
        list: [
            { name: 'smoke', title: 'Можно курить', checked: false },
            { name: 'pets', title: 'Можно с питомцами', checked: true },
            { name: 'guests', title: 'Можно пригласить гостей<br>(до 10 человек)', checked: true },
        ],
        title: 'Checkbox buttons',
    },

    getElement,
};

export default checkboxList;
