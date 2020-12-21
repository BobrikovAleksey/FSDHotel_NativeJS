const template = `
    <div class="ui__container">
        <h1>This one is the sub-section or widget title</h1><br>

        <h2>Next one is the item title inside widgets</h2><br>

        <h3>This is a label or CTA text</h3><br>

        This is the body text which is used for most of the design, like paragraphs, lists, etc.<br><br>

        <div class="ui__block">
            <label class="ui__label">Text Field</label>
            <input type="text" placeholder="Email"/>
        </div><br>

        <div class="ui__block">
            <cm-select ref="demoSelectSingle" />
        </div><br>

        <div class="ui__block">
            <cm-select ref="demoSelectMany" />
        </div><br>

        <div class="ui__block">
            <checkbox-list ref="demoCheckboxList"></checkbox-list>
        </div><br>
    
        <div class="ui__block">
            <radio-group ref="demoRadioGroup"></radio-group>
        </div><br>
    
        <div class="ui__block">
            <label class="ui__label">Toggle</label>
            <toggle ref="demoToggle"></toggle>
        </div><br>

        <div class="ui__block">
            <label class="label ui__label" style="margin-bottom: 16px;">Like button</label>
            <like-button ref="demoLikeButton"></like-button>
        </div><br>

        <div class="ui__block">
            <label class="ui__label">Buttons</label>

            <div class="ui__row">
                <button class="button">Click me</button>
                <button class="button" style="margin-left: 1rem" disabled>Click me</button>
            </div>

            <div class="ui__row">
                <button class="button button_white">Click me</button>
                <button class="button button_white" style="margin-left: 1rem" disabled>Click me</button>
            </div>

            <div class="ui__row">
                <button>Click me</a>
                <button style="margin-left: 1rem" disabled>Click me</a>
            </div>

            <div class="ui__row">
                <button class="button button_lg">Go to<i class="material-icons">arrow_forward</i></button>
            </div>
        </div><br>

        <div class="ui__block">
            <label class="ui__label">Pagination</label>
            <pagination ref="demoPagination"></pagination>
        </div><br>

        <div class="ui__block">
            <bullet-list ref="demoBulletList"></bullet-list>
        </div><br>
    </div>
`;

const components = [
    {
        name: 'BulletList',
        ref: 'demoBulletList',
        params: {
            label: 'Bullet list',
            list: [
                'Нельзя с питомцами',
                'Без вечеринок и мероприятий',
                'Время прибытия — после 13:00,<br>а выезд до 12:00',
            ],
        },
    },
    {
        name: 'CheckboxList',
        ref: 'demoCheckboxList',
        params: {
            label: 'Checkbox buttons',
            list: [
                { checked: false, label: 'Можно курить', name: 'smoke' },
                { checked: true, label: 'Можно с питомцами', name: 'pets' },
                { checked: true, label: 'Можно пригласить гостей<br>(до 10 человек)', name: 'guests' },
            ],
        },
    },
    {
        name: 'LikeButton',
        ref: 'demoLikeButton',
        params: { checked: false, name: 'like', value: 11 },
    },
    {
        name: 'Pagination',
        ref: 'demoPagination',
        params: {},
    },
    {
        name: 'RadioGroup',
        ref: 'demoRadioGroup',
        params: {
            list: [
                { name: 'male', label: 'Мужчина', checked: true },
                { name: 'female', label: 'Женщина', checked: false },
            ],
            name: 'sex',
            title: 'Radio buttons',
        },
    },
    {
        name: 'cmSelect',
        ref: 'demoSelectSingle',
        params: {
            list: [
                { label: 'Взрослые', max: 9, min: 0, name: 'smoke', value: 0, units: ['гость', 'гостя', 'гостей'] },
                { label: 'Дети', max: 9, min: 0, name: 'pets', value: 0 },
                { label: 'Младенцы', max: 9, min: 0, name: 'guests', value: 0 },
            ],
            placeholder: 'Сколько гостей',
            title: 'Dropdown',
        },
    },
    {
        name: 'cmSelect',
        ref: 'demoSelectMany',
        params: {
            list: [
                { label: 'Спальни', max: 4, min: 1, name: 'bedroom', value: 1, units: ['спальная', 'спальни', 'спален'] },
                { label: 'Кровати', max: 9, min: 1, name: 'bed', value: 1, units: ['кровать', 'кровати', 'кроватей'] },
                { label: 'Ванные комнаты', max: 2, min: 0, name: 'bathroom', value: 0, units: ['ванная комната', 'ванных комнаты', 'ванных комнат'] },
            ],
            single: false,
            title: 'Dropdown',
        },
    },
    // {
    //     name: 'Toggle',
    //     ref: 'demoToggle',
    //     params: { checked: true, label: 'Получать спецпредложения', name: 'offers' },
    // },
];

export default {
    template,
    components,
};
