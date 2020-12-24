import BaseView from './base-view.js';

class Agreements extends BaseView {
    template = `
        <div class="view">
            <div class="view__container">
                <h1>Соглашения</h1>
            </div>
        </div>
    `;

    state = {};

    constructor(data = {}) {
        super(data);
    };

    create(app) {
        super.create(app);

        this.$app.$views.Agreements = this;
    };

    /** Обновляет страницу */
    update = function () {

    }.bind(this);
}

export default Agreements;
