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
        <div class="radio-group__item">
            <input type="radio">
            <label class="radio-group__title"></label>
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
        this.$state.actions.setCurrentPage(parseInt(event.target.textContent));
        this.update();
    }.bind(this);

    listUpdate = function () {
        const list = this.$el.querySelector('.radio-group__list');

        while (list.childNodes.length > 0) {
            list.removeChild(list.childNodes[0]);
        }
        list.insertAdjacentHTML('afterbegin', this._getListTemplate(this.data.list.length));

        list.querySelectorAll('input[type="radio"]').forEach((el, i) => {
            el.setAttribute('id', `${this.data.name}-${this.data.list[i].name}`);
            el.setAttribute('name', this.data.name);
            el.setAttribute('value', this.data.list[i].name);
            this.data.list[i].checked && el.setAttribute('checked', '');
        });

        list.querySelectorAll('.radio-group__title').forEach((el, i) => {
            el.setAttribute('for', `${this.data.name}-${this.data.list[i].name}`);
            el.textContent = this.data.list[i].label;
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
