'use strict';

import BaseComponent from './base-component.js';

// noinspection JSUnusedGlobalSymbols
class Toggle extends BaseComponent {
    template = `
        <!--suppress CheckTagEmptyBody -->
        <div class="toggle">
            <input type="checkbox">
            <label class="toggle__label" tabindex="0">
                <span class="toggle__box"></span>
                <span class="toggle__title"></span>
            </label>
        </div>
    `;

    static getTag = () => 'toggle';
    static getType = () => 'Toggle';

    constructor({ name, checked, label = '' }) {
        super();
        this.data = { label, name, checked };
    };

    click = function (event) {
        if (event.key !== 'Enter') return;

        const input = event.target.parentNode.querySelector('input[type="checkbox"]');
        input.checked = !input.checked;
    }.bind(this);

    change = function (event) {
        this.data.checked = event.target.checked;

        console.log( this.data.checked);
    }.bind(this);

    render(app, node) {
        super.render(app, node);

        const input = this.$el.querySelector('input[type="checkbox"]');
        input.setAttribute('id', this.data.name);
        input.setAttribute('name', this.data.name);
        input.setAttribute('value', this.data.name);
        this.data.checked && input.setAttribute('checked', '');

        input.addEventListener('change', this.change);

        const label = this.$el.querySelector('.toggle__label');
        label.setAttribute('for', this.data.name);

        label.addEventListener('keydown', this.click);

        this.$el.querySelector('.toggle__title').textContent = this.data.label;
    };
}

export default Toggle;
