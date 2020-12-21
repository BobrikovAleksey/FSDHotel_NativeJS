import BaseComponent from './base-component.js';

class RadioGroup extends BaseComponent {
    template = `
        <div class="radio-group">
            <label class="label radio-group__title hide" data-title></label>
            <ul class="radio-group__list" data-list></ul>
        </div>
    `;

    listTemplate = `
        <li class="radio-group__item">
            <input type="radio" data-radio>
            <label class="radio-group__label" data-label tabindex="0"></label>
            <span class="radio-group__box"></span>
        </li>
    `;

    static getTag = () => 'radio-group';
    static getType = () => 'RadioGroup';

    constructor({ list, name, title = '' }) {
        super();
        this.data = { list, name, title }
    };

    click = function (event) {
        if (event.key !== 'Enter') return;

        event.target.parentNode.querySelector('input[data-radio]').checked = true;
    }.bind(this);

    change = function (event) {
        const radio = event.target;

        this.data.list.forEach((el) => {
             el.checked = radio.hasAttribute('value') && el.name === radio.getAttribute('value');
        });
    }.bind(this);

    listUpdate = function () {
        const list = this.$el.querySelector('ul[data-list]');

        while (list.childNodes.length > 0) {
            list.removeChild(list.childNodes[0]);
        }
        list.insertAdjacentHTML('afterbegin', this._getListTemplate(this.data.list.length));

        const radios = list.querySelectorAll('input[data-radio]');
        radios.forEach((el, i) => {
            el.setAttribute('id', `${this.data.name}-${this.data.list[i].name}`);
            el.setAttribute('name', this.data.name);
            el.setAttribute('value', this.data.list[i].name);
            this.data.list[i].checked && el.setAttribute('checked', '');

            el.addEventListener('change', this.change);
        });

        const label = list.querySelectorAll('label[data-label]');
        label.forEach((el, i) => {
            el.setAttribute('for', `${this.data.name}-${this.data.list[i].name}`);
            el.textContent = this.data.list[i].label;

            el.addEventListener('keydown', this.click);
        });
    }.bind(this);

    render(app, node) {
        super.render(app, node);

        if (this.data.title) {
            const title = this.$el.querySelector('label[data-title]');

            title.textContent = this.data.title;
            title.classList.remove('hide');
        }

        this.listUpdate();
    };
}

export default RadioGroup;
