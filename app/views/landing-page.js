import BaseView from './base-view.js';

class LandingPage extends BaseView {
    template = `
        <div class="view landing-page">
            <div class="view__container">
                <div class="card selection">
                    <h1 class="card__title_mt1">Найдём номера под ваши пожелания</h1>

                    <div class="card__block">
                        <x-range-datepicker> </x-range-datepicker>
                    </div>

                    <div class="card__block">
                        <x-select> </x-select>
                    </div>

                    <button class="button card__button card__button_pr24">
                        Подобрать номер<i class="material-icons">arrow_forward</i>
                    </button>
                </div>
            </div>
        </div>
    `;

    components = [
        {
            type: 'RangeDatepicker',
            params: {
                name: 'dates',
                placeholder: 'ДД.ММ.ГГГГ',
                titles: [ 'Прибытие', 'Выезд' ],
            },
        },
        {
            type: 'Select',
            params: {
                list: [
                    { label: 'Взрослые', max: 9, min: 0, units: ['гость', 'гостя', 'гостей'] },
                    { label: 'Дети', max: 9, min: 0 },
                    { label: 'Младенцы', max: 9, min: 0 },
                ],
                name: 'guests',
                placeholder: 'Сколько гостей',
                title: 'Гости',
            },
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
