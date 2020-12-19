'use strict';

import BaseComponent from './base-component.js';

// noinspection JSUnusedGlobalSymbols
class LikeButton extends BaseComponent {
    template = `
        <!--suppress CheckTagEmptyBody -->
        <div class="like-button">
            <input type="checkbox" data-input>
            <label class="like-button__box" data-label tabindex="0">
                <span class="like-button__icon">
                    <i class="material-icons">favorite</i>
                    <i class="material-icons border">favorite_border</i>
                </span>
    
                <p class="like-button__counter" data-counter></p>
            </label>
        </div>
    `;

    static getTag = () => 'like-button';
    static getType = () => 'LikeButton';

    constructor({ name, value = 0, checked = false }) {
        super();
        this.data = { checked, name, value };
    };

    click = function (event) {
        if (event.key !== 'Enter') return;

        this.$objects.input.checked = !this.$objects.input.checked;
        this.change();
    }.bind(this);

    change = function () {
        this.data.checked = this.$objects.input.checked;
        this.data.value = this.data.checked ? ++this.data.value : --this.data.value;

        this.$objects.counter.textContent = this.data.value;
    }.bind(this);

    render(app, node) {
        super.render(app, node);

        this.$objects = {
            input: this.$el.querySelector('input[data-input]'),
            counter: this.$el.querySelector('p[data-counter]'),
        };
        const label = this.$el.querySelector('label[data-label]');

        this.$objects.input.setAttribute('id', this.data.name);
        this.$objects.input.setAttribute('name', this.data.name);
        this.data.checked && this.$objects.input.setAttribute('checked', '');

        label.setAttribute('for', this.data.name);

        this.$objects.input.addEventListener('change', this.change);
        label.addEventListener('keydown', this.click);

        this.$objects.counter.textContent = this.data.value;
    };
}

export default LikeButton;
