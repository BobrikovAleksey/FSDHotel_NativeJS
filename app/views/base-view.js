// noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
class BaseView {
    state = {};
    $el = null;

    constructor(data) {
        this.state = { ...data };
    };

    /**
     * Создает html-элемент в корневом элементе страницы - <main>
     * @param app
     */
    create(app) {
        this.$app = app;
        app.$views.Root.insertAdjacentHTML('beforeend', this.template);
        this.$el = app.$views.Root.lastElementChild;
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
}

export default BaseView;
