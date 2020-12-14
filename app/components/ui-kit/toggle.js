const template = `
    <div class="toggle">
        <input type="checkbox" id="tg-$name$" name="$name$" $checked$>
        <label class="toggle__title" for="tg-$name$">
            <span class="toggle__box"></span>
            <p>$title$</p>
        </label>
    </div>
`;

/**
 * Возвращает html-элемент в виде строки
 *
 * @param object
 * @returns {string}
 */
function getElement(object) {
    let html = template.replaceAll('$name$', object.data.name);
    html = html.replaceAll('$title$', object.data.title);
    html = html.replaceAll('$checked$', object.data.checked ? 'checked' : '');
    return html;
}

const toggle = {
    node: null,
    type: 'toggle',
    data: {
        checked: true,
        name: 'offers',
        title: 'Получать спецпредложения',
    },

    getElement,
};

export default toggle;
