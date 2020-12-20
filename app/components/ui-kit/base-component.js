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
        for (let key in Object.keys(data)) {
            if (!this.cache.hasOwnProperty(key) || data[key] !== this.cache[key]) return true;
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
     * Возвращает подходящее склонение в зависимости от числа
     * @param n
     * @param units array['предмет', 'предмета', 'предметов']
     * @returns {*}
     */
    declOfNum = (n, units) => {
        if (!Array.isArray(units)) {
            units = [ '', '', '' ];
        } else {
            while (units.length < 3) units.push('');
        }

        n = Math.abs(n) % 100;
        if (n > 10 && n < 20) return units[2];

        n %= 10;
        if (n > 1 && n < 5) return units[1];

        return n === 1 ? units[0] : units[2];
    }

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
