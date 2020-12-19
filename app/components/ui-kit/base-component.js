// noinspection JSUnusedGlobalSymbols
class BaseComponent {
    template = '';
    listTemplate = '';

    constructor(data = {}) {
        this.cache = { ...data };
    };

    /**
     * Проверка изменения состояния
     */
    isStateChanged = function (data) {
        for (let prop in data) {
            if (!prop in this.cache || data[prop] !== this.cache[prop]) return true;
        }
        return false;
    }.bind(this);

    _getTemplate = function () {
        return this.template;
    }.bind(this);

    _getListTemplate = function (count = 1) {
        return this.listTemplate.repeat(count > 0 ? count : 1);
    }.bind(this);

    /**
     * Размещает html-элемент в DOM вместо указанного
     * @param app
     * @param node
     */
    render(app, node) {
        this.$app = app;
        this.$refs = this.$app.$refs;
        this.$router = this.$app.$router;
        this.$state = this.$app.$state;
        this.$actions = this.$app.$actions;
        this.$getters = this.$app.$getters;

        node.insertAdjacentHTML('afterend', this._getTemplate());
        this.$el = node.nextElementSibling;
        node.parentNode.removeChild(node);
    };
}

export default BaseComponent;
