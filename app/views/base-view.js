// noinspection DuplicatedCode,JSUnresolvedFunction,JSUnresolvedVariable,JSUnusedGlobalSymbols
class BaseView {
    /**
     * @var template        string          шаблон представления
     *
     * @var $app            object          ссылка на корневой элемент приложения
     * @var $components     object          ссылки на компоненты представления
     * @var $el             NodeElement     ссылка на созданный html-элемент
     * @var $name           string          название объекта
     * @var $state          object          состояние объекта
     */

    constructor(data) {
        this.$state = { ...data };
    };

    /**
     * Создает html-элемент в корневом элементе страницы - <main>
     * @param app
     */
    create(app) {
        this.$app = app;
        app.$views.$Root.insertAdjacentHTML('beforeend', this._getTemplate());
        this.$el = app.$views.$Root.lastElementChild;

        if (this.$name) {
            this.$app.$views[this.$name] = this;
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

    /** Скрывает страницу */
    hide = function () {
        if (this.$el) {
            this.$el.style.visibility = 'hidden';
            this.$el.style.position = 'absolute';
        }
    }.bind(this);

    /** Показывает страницу */
    show = function () {
        if (this.$el) {
            this.$el.style.visibility = 'visible';
            this.$el.style.position = 'relative';
        }
    }.bind(this);

    /**
     * Возвращает шаблон с заменой url
     * @return {string}
     * @private
     */
    _getTemplate = function () {
        const urlPattern = /{{\s*url\s*}}/g;

        return this.template.replace(urlPattern, this.$app.$config.url);
    }.bind(this);
}

export default BaseView;
