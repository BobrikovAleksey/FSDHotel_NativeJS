import BaseComponent from './base-component.js';

class Select extends BaseComponent {
    template = `
        <div class="select">
            <h3 class="select__label"> </h3>

            <details>
                <summary> </summary>

                <div class="select__dropdown">
                    <ul class="select__list">{{ list }}</ul>

                    <div class="select__button-panel">
                        <button data-clear>Очистить</button>
    
                        <button data-apply>Применить</button>
                    </div>
                </div>
            </details>
        </div>
    `;

    templateList = `
        <li class="select__item">
            <label class="select__item-label"> </label>

            <div class="number-field">
                <button class="number-field__spin-button" data-step="-1">-</button>

                <input class="number-field__input" type="number" disabled />

                <button class="number-field__spin-button" data-step="1">+</button>
            </div>
        </li>
    `;

    static getTag = () => 'x-select';
    static getType = () => 'Select';

    constructor({ list, name, placeholder = '', single = true, title = '' } = {}) {
        list.forEach((item) => {
            if (!item.hasOwnProperty('max')) item.max = 99;
            if (!item.hasOwnProperty('min')) item.min = 0;
            if (!item.hasOwnProperty('value')) item.value = item.min;
            item.newValue = item.value;
        });

        const minValue = list.reduce((sum, item) => sum + item.min, 0);

        super({ list, minValue, placeholder, single, title });

        if (typeof name === 'string') this.$name = name;

        this.data = {
            mouse: false,
        };
    };

    /** Сохраняет изменения */
    apply = function () {
        this.$state.list.forEach((el) => el.value = el.newValue);

        this.switchSpinButtons();
        this.update();
    }.bind(this);

    /** Очищает поле */
    clear = function () {
        this.$state.list.forEach((el, i) => {
            el.value = el.min;
            el.newValue = el.min;
            this.$nodes.numInputs[i].value = el.min;
        });

        this.switchSpinButtons();
        this.update();
    }.bind(this);

    mouseEnter = function () {
        this.data.mouse = true;
    }.bind(this);

    mouseLeave = function () {
        this.data.mouse = false;
    }.bind(this);

    clickDocument = function () {
        if (this.data.mouse) return;

        this.$nodes.details.hasAttribute('open') && this.$nodes.details.removeAttribute('open');
    }.bind(this);

    /**
     * Увеличивает/уменьшает количество на единицу
     * @param event
     */
    stepNumber = function (event) {
        if (!event.target.hasAttribute('data-key')) return;
        if (!event.target.hasAttribute('data-step')) return;

        const key = event.target.getAttribute('data-key');

        this.$state.list[key].newValue += Number(event.target.getAttribute('data-step'))

        if (this.$state.list[key].newValue > this.$state.list[key].max) {
            this.$state.list[key].newValue = this.$state.list[key].max;
        } else if (this.$state.list[key].newValue < this.$state.list[key].min) {
            this.$state.list[key].newValue = this.$state.list[key].min;
        }

        this.$nodes.numInputs[key].value = this.$state.list[key].newValue;

        this.switchSpinButton(key);
        this.update();
    }.bind(this);

    /**
     * Включить/отключить кнопки числового поля
     * @param key
     */
    switchSpinButton = function (key) {
        if (this.$state.list[key].newValue === this.$state.list[key].min) {
            this._deactivateButton(this.$nodes.decButtons[key]);
            this._activateButton(this.$nodes.incButtons[key]);

        } else if (this.$state.list[key].newValue ===  this.$state.list[key].max) {
            this._activateButton(this.$nodes.decButtons[key]);
            this._deactivateButton(this.$nodes.incButtons[key]);

        } else {
            this._activateButton(this.$nodes.decButtons[key]);
            this._activateButton(this.$nodes.incButtons[key]);
        }
    }.bind(this);

    /** Включить/отключить кнопки числовых полей */
    switchSpinButtons = function () {
        for (let i = 0; i < this.$state.list.length; i++) {
            this.switchSpinButton(i);
        }
    }.bind(this);

    _activateButton(button) {
        button.hasAttribute('disabled') && button.removeAttribute('disabled');
    };

    _deactivateButton(button) {
        !button.hasAttribute('disabled') && button.setAttribute('disabled', '');
    };

    /**
     * Включить/отключить кнопку
     * @param button NodeElement
     * @param disabled boolean
     */
    switchButton = function (button, disabled) {
        if (disabled) {
            this._deactivateButton(button);
        } else {
            this._activateButton(button);
        }
    }.bind(this);

    /** Обновляет текст основного поля и кнопки очистки и сохранения изменений */
    update = function () {
        const sum = this.$state.list.reduce((sum, item) => sum + item.value, 0);
        const sumNew = this.$state.list.reduce((sum, item) => sum + item.newValue, 0);

        this.switchButton(this.$nodes.clear, sum === this.$state.minValue && sumNew === this.$state.minValue);
        this.switchButton(this.$nodes.apply, this.$state.list.filter((el) => el.value !== el.newValue).length === 0);

        if (sum === 0) {
            this.$nodes.value.textContent = this.$state.placeholder;

        } else if (this.$state.single) {
            this.$nodes.value.textContent = `${ sum } ${ BaseComponent.declOfNum(sum, this.$state.list[0].units) }`;

        } else {
            this.$nodes.value.textContent = this.$state.list.reduce((result, el) => {
                if (el.value === 0) return result;

                if (result.length > 0) result += ', ';
                return `${ result }${ el.value } ${ BaseComponent.declOfNum(el.value, el.units) }`;
            }, '');
        }
    }.bind(this);

    create(app, node, storage = null) {
        super.create(app, node, storage);

        this.$nodes = {
            apply: this.$el.querySelector('[data-apply]'),
            clear: this.$el.querySelector('[data-clear]'),
            details: this.$el.querySelector('details'),
            dropdown: this.$el.querySelector('.select__dropdown'),
            decButtons: this.$el.querySelectorAll('[data-step="-1"]'),
            incButtons: this.$el.querySelectorAll('[data-step="1"]'),
            numInputs: this.$el.querySelectorAll('.number-field__input'),
            value: this.$el.querySelector('summary'),
        };
        this.$el.querySelector('h3').textContent = this.$state.title;
        this.$el.querySelectorAll('.select__item-label').forEach((el, i) => el.textContent = this.$state.list[i].label);

        document.addEventListener('mousedown', this.clickDocument);
        this.$nodes.details.addEventListener('mouseenter', this.mouseEnter);
        this.$nodes.details.addEventListener('mouseleave', this.mouseLeave);
        this.$nodes.apply.addEventListener('click', this.apply);
        this.$nodes.clear.addEventListener('click', this.clear);

        for (let i = 0; i < this.$nodes.numInputs.length; i++) {
            this.$nodes.numInputs[i].setAttribute('min', this.$state.list[i].min);
            this.$nodes.numInputs[i].setAttribute('max', this.$state.list[i].max);
            this.$nodes.numInputs[i].setAttribute('value', this.$state.list[i].value);
            this.$nodes.decButtons[i].setAttribute('data-key', i);
            this.$nodes.incButtons[i].setAttribute('data-key', i);

            this.$nodes.decButtons[i].addEventListener('click', this.stepNumber);
            this.$nodes.incButtons[i].addEventListener('click', this.stepNumber);
        }

        this.switchSpinButtons();
        this.update();
    };
}

export default Select;
