import BaseComponent from './base-component.js';

class CardSearch extends BaseComponent {
    template = `
        <div class="card card-search">
            <h1>Найдём номера под ваши пожелания</h1>

            <x-range-datepicker class="card__datepicker"> </x-range-datepicker>

            <x-select class="card__select"> </x-select>

            <button class="button-icon button-icon_forward button_lg card__button">Подобрать номер</button>
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
                name: 'guests',
                list: [
                    { label: 'Взрослые', max: 9, min: 0, units: ['гость', 'гостя', 'гостей'] },
                    { label: 'Дети', max: 9, min: 0 },
                    { label: 'Младенцы', max: 9, min: 0, units: ['младенец', 'младенца', 'младенцев'] },
                ],
                placeholder: 'Сколько гостей',
                title: 'Гости',
            },
        },
    ];

    static getTag = () => 'x-card-search';
    static getType = () => 'CardSearch';

    constructor({ name } = {}) {
        super();

        if (typeof name === 'string') this.$name = name;
    };

    create(app, node, storage = null) {
        super.create(app, node, storage);
    };
}

export default CardSearch;
