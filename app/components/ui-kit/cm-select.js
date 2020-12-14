const template = `
    <div class="select">
        <label class="select__label">$title$</label>

        <div class="select__container">
            <input class="select__input" type="button" value="$active$" />

            <span class="select__icon">
                <i class="material-icons">expand_more</i>
            </span>

            <ul class="select__list">$list$</ul>
        </div>
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
        list += `<li class="select__item" value="${el.name}">${el.title}</li>`;
    });

    let html = template.replaceAll('$title$', object.data.title);
    html = html.replaceAll('$list$', list);
    html = html.replaceAll('$active$', object.data.default);
    return html;
}

const cmSelect = {
    node: null,
    type: 'cm-select',
    data: {
        default: 'Сколько гостей',
        list: [
            { name: 'adults', title: 'Взрослые' },
            { name: 'children', title: 'Дети' },
            { name: 'babies', title: 'Младенцы' },
        ],
        title: 'Dropdown',
    },

    getElement,
};

export default cmSelect;
