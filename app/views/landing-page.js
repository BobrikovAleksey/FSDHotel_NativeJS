import BaseView from './base-view.js';

class LandingPage extends BaseView {
    template = `
        <div class="view landing-page">
            <div class="view__container">
                <x-card-search> </x-card-search>
                
                <p class="landing-page__about">Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
            </div>
        </div>
    `;

    components = [
        {
            type: 'CardSearch',
        },
    ];

    $name = 'LandingPage';

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

export default LandingPage;
