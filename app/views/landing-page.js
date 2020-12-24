import BaseView from './base-view.js';

class LandingPage extends BaseView {
    template = `
        <div class="view landing-page">
            <div class="view__container">
                
            </div>
        </div>
    `;

    state = {};

    constructor(data = {}) {
        super(data);
    };

    create(app) {
        super.create(app);

        this.$app.$views.LandingPage = this;
    };

    /** Обновляет страницу */
    update = function () {

    }.bind(this);
}

export default LandingPage;
