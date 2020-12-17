const template = `
    <div class="bullet-list">
        {{ label }}
        <ul class="bullet-list__list">{{ list }}</ul>
    </div>
`;

/**
 * Возвращает подготовленный html-шаблон
 * @param list array
 * @param label string
 * @returns {string}
 */
const getTemplate = (list, label) => {
    const htmlLabel = `<label class="label bullet-list__label">${label}</label>`;
    const htmlList = list.map((el) => `<li class="bullet-list__item">${el}</li>`);

    return template.replace(/{{\s*label\s*}}/g, htmlLabel)
                   .replace(/{{\s*list\s*}}/g, htmlList.join(''));
};


// noinspection DuplicatedCode
class BulletList {
    static getTag() { return 'bullet-list'; };
    static getType() { return 'BulletList'; };

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

    /**
     * Размещает html-элемент в DOM вместо указанного
     * @param app
     * @param node
     * @param list array
     * @param label string
     */
    render(app, node, { list = [], label = '' } = {}) {
        this.$app = app;
        this.$refs = this.$app.$refs;
        this.$router = this.$app.$router;
        this.$storage = this.$app.$storage;
        this.$actions = this.$app.$actions;
        this.$getters = this.$app.$getters;

        node.insertAdjacentHTML('afterend', getTemplate(this.data.list, this.data.label));
        this.$el = node.nextElementSibling;
        node.parentNode.removeChild(node);
    };
}

export default BulletList;
