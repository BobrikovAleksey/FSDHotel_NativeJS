const template = `
    <div class="checkbox-list">
        {{ label }}
        <div class="checkbox-list__list">{{ list }}</div>
    </div>
`;

/**
 * Возвращает подготовленный html-шаблон
 * @param list array
 * @param label string
 * @returns {string}
 */
const getTemplate = (list, label) => {
    const htmlLabel = `<label class="label checkbox-list__label">${ label }</label>`;
    const htmlList = list.map((el) => `
        <div class="checkbox-list__item">
            <input type="checkbox" id="cb-${ el.name }" name="${ el.name }" ${ el.checked ? 'checked' : '' }>
            <label class="checkbox-list__title" for="cb-${ el.name }"><p>${ el.label }</p></label>
            <span class="checkbox-list__box"></span>
        </div>
    `);

    return template.replace(/{{\s*label\s*}}/g, htmlLabel)
                   .replace(/{{\s*list\s*}}/g, htmlList.join(''));
};


// noinspection DuplicatedCode
class CheckboxList {
    static getTag = () => 'checkbox-list';
    static getType = () => 'CheckboxList';

    /**
     * Конструктор класса
     * @param list array
     * @param label string
     */
    constructor({ list = [], label = '' } = {}) {
        this.data.label = typeof label === 'string' && label.length > 0 ? label : '';
        this.data.list = Array.isArray(list) ? list : [];
    };

    data = {
        list: [],
        label: '',
    };

    actions = {
        /**
         * Обрабатывает изменение в checkbox
         */
        change: function (event) {
            const el = event.target;
            if (!el.hasAttribute('name')) return;

            this.data.list.forEach((item) => {
                if (item.name === el.getAttribute('name')) {
                    item.checked = el.checked;
                }
            });
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

        node.insertAdjacentHTML('afterend', getTemplate(this.data.list, this.data.label));
        this.$el = node.nextElementSibling;
        node.parentNode.removeChild(node);

        const items = this.$el.querySelectorAll('input[type="checkbox"]');
        items.forEach((el) => el.addEventListener('change', this.actions.change));
    };
}

export default CheckboxList;
