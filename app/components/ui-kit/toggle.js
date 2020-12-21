import BaseComponent from './base-component.js';

class Toggle extends BaseComponent {
    template = `
        <div class="toggle">
            <input type="checkbox" data-input>
            <label class="toggle__label" data-label tabindex="0">
                <span class="toggle__box"></span>
                <span class="toggle__title"></span>
            </label>
        </div>
    `;

    static getTag = () => 'toggle';
    static getType = () => 'Toggle';

    constructor({ name, checked, label = '' }) {
        super();
        this.data = { checked, label, name };
    };

    click = function (event) {
        if (event.key !== 'Enter') return;

        this.$objects.input.checked = !this.$objects.input.checked;
    }.bind(this);

    change = function (event) {
        this.data.checked = event.target.checked;
    }.bind(this);

    render(app, node) {
        super.render(app, node);

        this.$objects = {
            input: this.$el.querySelector('input[data-input]'),
        };

        this.$objects.input.setAttribute('id', this.data.name);
        this.$objects.input.setAttribute('name', this.data.name);
        this.data.checked && this.$objects.input.setAttribute('checked', '');

        const label = this.$el.querySelector('.toggle__label');
        label.setAttribute('for', this.data.name);

        this.$objects.input.addEventListener('change', this.change);
        label.addEventListener('keydown', this.click);

        this.$el.querySelector('.toggle__title').textContent = this.data.label;
    };
}

export default Toggle;
