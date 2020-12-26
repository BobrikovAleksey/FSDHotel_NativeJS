import BaseView from './base-view.js';

class Services extends BaseView {
    template = `
        <div class="view">
            <div class="view__container">
                <h1>Услуги</h1>
            </div>
        </div>
    `;

    $name = 'Services';

    constructor(data = {}) {
        super(data);
    };

    create(app) {
        super.create(app);

        this.$app.$views.Services = this;
    };

    /** Обновляет страницу */
    update = function () {

    }.bind(this);
}

export default Services;
