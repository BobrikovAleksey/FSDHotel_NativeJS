import BaseView from './base-view.js';

class About extends BaseView {
    template = `
        <div class="view">
            <div class="view__container">
                <h1>О нас</h1>
            </div>
        </div>
    `;

    state = {};

    constructor(data = {}) {
        super(data);
    };

    create(app) {
        super.create(app);

        this.$app.$views.About = this;
    };

    /** Обновляет страницу */
    update = function () {

    }.bind(this);
}

export default About;
