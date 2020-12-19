'use strict';

import BaseComponent from './base-component.js';

// noinspection JSUnusedGlobalSymbols
class RadioGroup extends BaseComponent {
    template = `
        <!--suppress CheckTagEmptyBody -->
        <div class="radio-group">
            <label class="label radio-group__label hide"></label>
            <div class="radio-group__list"></div>
        </div>
    `;

    listTemplate = `
        <!--suppress CheckTagEmptyBody -->
        <div class="radio-group__item">
            <input type="radio">
            <label class="radio-group__title" tabindex="0"></label>
            <span class="radio-group__box"></span>
        </div>
    `;

    static getTag = () => 'radio-group';
    static getType = () => 'RadioGroup';

    constructor({ list, name, label = '' }) {
        super();
        this.data = { label, list, name }
    };

    click = function (event) {
        if (event.key !== 'Enter') return;

        event.target.parentNode.querySelector('input[type="radio"]').checked = true;
    }.bind(this);

    change = function (event) {
        const button = event.target;

        this.data.list.forEach((el) => {
             el.checked = button.hasAttribute('value') && el.name === button.getAttribute('value');
        });
    }.bind(this);

    listUpdate = function () {
        const list = this.$el.querySelector('.radio-group__list');

        while (list.childNodes.length > 0) {
            list.removeChild(list.childNodes[0]);
        }
        list.insertAdjacentHTML('afterbegin', this._getListTemplate(this.data.list.length));

        const buttons = list.querySelectorAll('input[type="radio"]');
        buttons.forEach((el, i) => {
            el.setAttribute('id', `${this.data.name}-${this.data.list[i].name}`);
            el.setAttribute('name', this.data.name);
            el.setAttribute('value', this.data.list[i].name);
            this.data.list[i].checked && el.setAttribute('checked', '');

            el.addEventListener('change', this.change);
        });

        list.querySelectorAll('.radio-group__title').forEach((el, i) => {
            el.setAttribute('for', `${this.data.name}-${this.data.list[i].name}`);
            el.textContent = this.data.list[i].label;

            el.addEventListener('keydown', this.click);
        });
    }.bind(this);

    render(app, node) {
        super.render(app, node);

        if (this.data.label) {
            const label = this.$el.querySelector('.radio-group__label');

            label.textContent = this.data.label;
            label.classList.remove('hide');
        }

        this.listUpdate();
    };
}

export default RadioGroup;
