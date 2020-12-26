import BaseView from './base-view.js';

class Agreements extends BaseView {
    template = `
        <div class="view">
            <div class="view__container">
                <h1>Соглашения</h1>
            </div>
        </div>
    `;

    $name = 'Agreements';

    constructor(data = {}) {
        super(data);
    };

    create(app) {
        super.create(app);
    };

    /** Обновляет страницу */
    update = function () {

    }.bind(this);
}

export default Agreements;
