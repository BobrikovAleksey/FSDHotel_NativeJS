// noinspection DuplicatedCode,JSUnresolvedVariable
class BaseComponent {
    /**
     * @var template        string          шаблон компонента
     * @var templateList    string          шаблон списка в компоненте
     *
     * @var $app            object          ссылка на корневой элемент приложения
     * @var $el             NodeElement     ссылка на созданный html-элемент
     * @var $name           string          название объекта
     * @var $state          object          состояние объекта
     * @var $cache          object          сохраненное состояние объекта (для контроля изменений)
     *
     * @static getTag       function        возвращает имя тега
     * @static getType      function        возвращает имя класса
     */

    constructor(data = {}, cache = false) {
        this.$state = { ...data };
        if (cache) this.$cache = { ...data };
    };

    /**
     * Возвращает подходящее склонение в зависимости от числа
     * @param num           number
     * @param units         string[]    ['предмет', 'предмета', 'предметов']
     * @returns {string}
     */
    static declOfNum = (num, units) => {
        if (!Array.isArray(units) || units.length === 0) units = [''];

        while (units.length < 3) units.push(units[0]);

        num = Math.abs(Math.floor(num)) % 100;
        if (num > 10 && num < 20) return units[2];

        num %= 10;
        return num > 1 && num < 5 ? units[1] : ( num === 1 ? units[0] : units[2] );
    }

    /**
     * Проверка изменения состояния
     * @returns {boolean}
     */
    isStateChanged = function () {
        if (!this.hasOwnProperty('$cache')) return false;

        Object.keys(this.$cache).forEach((key) => {
            if (!this.$state.hasOwnProperty(key) || this.$cache[key] !== this.$state[key]) return true;
        });
        return false;
    }.bind(this);

    /**
     * Создает html-элемент вместо указанного
     * @param app
     * @param node
     * @param storage       object      место хранения компонента
     */
    create(app, node, storage = null) {
        this.$app = app;

        node.insertAdjacentHTML('afterend', this._getTemplate());
        this.$el = node.nextElementSibling;
        node.parentNode.removeChild(node);

        if (storage !== null && this.$name) {
            storage[this.$name] = this;
            this.$components = {};
        } else {
            this.$components = null;
        }

        if (!this.hasOwnProperty('components')) return;

        this.components.forEach((el) => {
            const Component = app.components[el.type];
            const node = this.$el.querySelector(Component.getTag());

            if (node) {
                const newComponent =  new Component(el.params, el.hasOwnProperty('cache') && el.cache);

                newComponent.create(app, node, this.$components);
            }
        });
    };

    /**
     * Возвращает шаблон с заменой url и вставкой списка
     * @return {string}
     * @private
     */
    _getTemplate = function () {
        const listPattern = /{{\s*list\s*}}/g;
        const urlPattern = /{{\s*url\s*}}/g;

        return this.template.replace(listPattern, this._getTemplateList())
                            .replace(urlPattern, this.$app.$config.url);
    }.bind(this);

    /**
     * Возвращает шаблон из списочных элементов
     * @return {string}
     * @private
     */
    _getTemplateList = function () {
        if (!this.hasOwnProperty('templateList') || !this.$state.hasOwnProperty('list')) return '';

        return this.templateList.repeat(this.$state.list.length);
    }.bind(this);
}

export default BaseComponent;
