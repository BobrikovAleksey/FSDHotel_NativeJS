import BaseView from './base-view.js';

class News extends BaseView {
    template = `
        <div class="view">
            <div class="view__container">
                <h1>Новости</h1>
            </div>
        </div>
    `;

    $name = 'News';

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

export default News;
