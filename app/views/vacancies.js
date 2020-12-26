import BaseView from './base-view.js';

class Vacancies extends BaseView {
    template = `
        <div class="view">
            <div class="view__container">
                <h1>Вакансии</h1>
            </div>
        </div>
    `;

    $name = 'Vacancies';

    constructor(data = {}) {
        super(data);
    };

    create(app) {
        super.create(app);

        this.$app.$views.Vacancies = this;
    };

    /** Обновляет страницу */
    update = function () {

    }.bind(this);
}

export default Vacancies;