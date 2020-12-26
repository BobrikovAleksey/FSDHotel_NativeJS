import BaseView from '../base-view.js';

import colorsAbdType from './colors-and-type.js';
import formElements from './form-elements.js';
import cards from './cards.js';

class UIkit extends BaseView {
    template = `
        <div class="ui-kit">
            <h1>UI Kit: <span data-current-panel="1">Colors & Type</span></h1>
    
            <div class="ui-kit__tabs">
                <button class="ui-kit__tab" data-tab="1" disabled>Colors & Type</button>
                <button class="ui-kit__tab" data-tab="2">Form Elements</button>
                <button class="ui-kit__tab" data-tab="3">Card</button>
            </div>
    
            <colors-and-type></colors-and-type>
    
            <form-elements></form-elements>
    
            <cards></cards>
        </div>
    `;

    $name = 'UIkit';

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

export default UIkit;

// const components = [
//     {
//         name: 'BulletList',
//         ref: 'demoBulletList',
//         params: {
//             label: 'Bullet list',
//             list: [
//                 'Нельзя с питомцами',
//                 'Без вечеринок и мероприятий',
//                 'Время прибытия — после 13:00,<br>а выезд до 12:00',
//             ],
//         },
//     },
//     {
//         name: 'CheckboxList',
//         ref: 'demoCheckboxList',
//         params: {
//             label: 'Checkbox buttons',
//             list: [
//                 { checked: false, label: 'Можно курить', name: 'smoke' },
//                 { checked: true, label: 'Можно с питомцами', name: 'pets' },
//                 { checked: true, label: 'Можно пригласить гостей<br>(до 10 человек)', name: 'guests' },
//             ],
//         },
//     },
//     {
//         name: 'LikeButton',
//         ref: 'demoLikeButton',
//         params: { checked: false, name: 'like', value: 11 },
//     },
//     {
//         name: 'Pagination',
//         ref: 'demoPagination',
//         params: {},
//     },
//     {
//         name: 'RadioGroup',
//         ref: 'demoRadioGroup',
//         params: {
//             list: [
//                 { name: 'male', label: 'Мужчина', checked: true },
//                 { name: 'female', label: 'Женщина', checked: false },
//             ],
//             name: 'sex',
//             title: 'Radio buttons',
//         },
//     },
//     {
//         name: 'cmSelect',
//         ref: 'demoSelectSingle',
//         params: {
//             list: [
//                 { label: 'Взрослые', max: 9, min: 0, name: 'smoke', value: 0, units: ['гость', 'гостя', 'гостей'] },
//                 { label: 'Дети', max: 9, min: 0, name: 'pets', value: 0 },
//                 { label: 'Младенцы', max: 9, min: 0, name: 'guests', value: 0 },
//             ],
//             placeholder: 'Сколько гостей',
//             title: 'Dropdown',
//         },
//     },
//     {
//         name: 'cmSelect',
//         ref: 'demoSelectMany',
//         params: {
//             list: [
//                 { label: 'Спальни', max: 4, min: 1, name: 'bedroom', value: 1, units: ['спальная', 'спальни', 'спален'] },
//                 { label: 'Кровати', max: 9, min: 1, name: 'bed', value: 1, units: ['кровать', 'кровати', 'кроватей'] },
//                 { label: 'Ванные комнаты', max: 2, min: 0, name: 'bathroom', value: 0, units: ['ванная комната', 'ванных комнаты', 'ванных комнат'] },
//             ],
//             single: false,
//             title: 'Dropdown',
//         },
//     },
//     {
//         name: 'Toggle',
//         ref: 'demoToggle',
//         params: { checked: true, label: 'Получать спецпредложения', name: 'offers' },
//     },
// ];
