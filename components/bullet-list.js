const template = `
    <div class="bullet-list">
        <label class="bullet-list__label">$title$</label>
        <ul class="bullet-list__list">$list$</ul>
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
        list += `<li class="bullet-list__item"><span></span>${el}</li>`;
    });

    let html = template.replaceAll('$title$', object.data.title);
    html = html.replaceAll('$list$', list);
    return html;
}

const bulletList = {
    node: null,
    type: 'bullet-list',
    data: {
        list: [
            'Нельзя с питомцами',
            'Без вечеринок и мероприятий',
            'Время прибытия — после 13:00,<br>выезд до 12:00',
        ],
        title: 'Bullet list',
    },

    getElement,
};

export default bulletList;
