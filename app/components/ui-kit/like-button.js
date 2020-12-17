const template = `
    <div class="like-button">
        <input type="checkbox" id="lb-{{ name }}" name="{{ name }}" {{ checked }}>
        <label class="like-button__box" for="lb-{{ name }}">
            <span class="like-button__icon">
                <i class="material-icons">favorite</i>
                <i class="material-icons border">favorite_border</i>
            </span>

            <p class="like-button__counter">{{ value }}</p>
        </label>
    </div>
`;

/**
 * Возвращает подготовленный html-шаблон
 * @param name string
 * @param value number
 * @param checked boolean
 * @returns {string}
 */
const getTemplate = (name, value, checked) => {
    return template.replace(/{{\s*name\s*}}/g, name)
                   .replace(/{{\s*value\s*}}/g, value)
                   .replace(/{{\s*checked\s*}}/g, checked ? 'checked' : '');
};

// noinspection DuplicatedCode
class LikeButton {
    static getTag = () => 'like-button';
    static getType = () => 'LikeButton';

    /**
     * Конструктор класса
     * @param name string
     * @param value number
     * @param checked boolean
     */
    constructor({ name = '', value = 0, checked = false } = {}) {
        this.data.name = typeof name === 'string'? name : '';
        this.data.value = typeof value === 'number'? Math.floor(value) : 0;
        this.data.checked = typeof checked === 'boolean'? checked : false;
    };

    data = {
        name: '',
        value: 0,
        checked: false,
    };

    actions = {
        /**
         * Обрабатывает изменение
         */
        change: function (event) {
            this.data.checked = event.target.checked;
            this.data.value = this.data.checked ? ++this.data.value : --this.data.value;

            this.actions.update();
        }.bind(this),

        /**
         * Обновляет содержимое
         */
        update: function () {
            const counter = this.$el.querySelector('p.like-button__counter');
            counter.textContent = this.data.value;
        }.bind(this),
    };

    /**
     * Размещает html-элемент в DOM вместо указанного
     * @param app
     * @param node
     */
    render(app, node) {
        this.$app = app;
        this.$refs = this.$app.$refs;
        this.$router = this.$app.$router;
        this.$storage = this.$app.$storage;
        this.$actions = this.$app.$actions;
        this.$getters = this.$app.$getters;

        node.insertAdjacentHTML('afterend', getTemplate(this.data.name, this.data.value, this.data.checked));
        this.$el = node.nextElementSibling;
        node.parentNode.removeChild(node);

        const item = this.$el.querySelector('input[type="checkbox"]');
        item.addEventListener('change', this.actions.change);
    };
}

export default LikeButton;
