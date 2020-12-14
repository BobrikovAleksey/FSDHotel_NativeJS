const template = `
    <div class="like-button">
        <input type="checkbox" id="lb-$name$" name="$name$" $checked$>
        <label class="like-button__box" for="lb-$name$">
            <i class="material-icons like-button__icon">favorite_border</i>
            <i class="material-icons like-button__icon_active">favorite</i>
            <p class="like-button__counter">$value$</p>
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
    html = html.replaceAll('$value$', object.data.value);
    html = html.replaceAll('$checked$', object.data.checked ? 'checked' : '');
    return html;
}

const likeButton = {
    node: null,
    type: 'like-button',
    data: {
        checked: true,
        name: 'like',
        value: 7,
    },

    getElement,
};

export default likeButton;
