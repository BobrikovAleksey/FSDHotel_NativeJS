'use strict';

import BaseComponent from './base-component.js';

const BUTTON_APPLY = 'apply';
const BUTTON_CLEAR = 'clear';

// noinspection JSUnusedGlobalSymbols
class cmSelect extends BaseComponent {
    template = `
        <!--suppress CheckTagEmptyBody -->
        <div class="select">
            <label class="label select__title" data-title></label>
    
            <div class="select__container">
                <input type="button" data-input />
    
                <span class="select__icon">
                    <i class="material-icons">expand_more</i>
                </span>
    
                <div class="select__dropdown" data-dropdown>
                    <ul class="select__list" data-list></ul>
    
                    <div class="select__control-panel">
                        <button data-clear>Очистить</button>
    
                        <button data-apply>Применить</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    listTemplate = `
        <!--suppress CheckTagEmptyBody -->
        <li class="select__item">
            <label class="select__label" data-label></label>

            <div class="select__number">
                <button class="select__spin-button" data-dec>-</button>

                <input type="number" data-key data-number />

                <button class="select__spin-button" data-inc>+</button>
            </div>
        </li>
    `;

    static getTag = () => 'cm-select';
    static getType = () => 'cmSelect';

    constructor({ list, placeholder = '', single = true, title = '' } = {}) {
        super({ sumMinValues: list.reduce((sum, item) => sum + item.min, 0) });

        list.forEach((item) => item.newValue = item.value);
        this.data = { list, placeholder, single, title };
    };

    /**
     * Возвращает фокус в главный input объекта
     */
    focus = function () {
        this.$objects.input.focus();
    }.bind(this);

    show = function () {
        !this.$objects.dropdown.classList.contains('show') && this.$objects.dropdown.classList.add('show');
    }.bind(this);

    hide = function () {
        this.$objects.dropdown.classList.contains('show') && this.$objects.dropdown.classList.remove('show');
    }.bind(this);

    /**
     * Сохраняет изменения
     */
    apply = function () {
        this.data.list.forEach((item) => {
            item.value = item.newValue;
        });

        this.update();
    }.bind(this);

    /**
     * Очищает поле
     */
    clear = function () {
        this.$objects.numberList.forEach((el, i) => {
            if (el.hasAttribute('min')) {
                el.value = el.getAttribute('min');
                this.data.list[i].value = Number(el.value);
                this.data.list[i].newValue = this.data.list[i].value;

            } else {
                el.value = 0;
                this.data.list[i].value = 0;
                this.data.list[i].newValue = 0;
            }
        });

        this.update();
    }.bind(this);

    changeNumber = function (input) {
        if (input.hasAttribute('data-key')) {
            this.data.list[input.getAttribute('data-key')].newValue = Number(input.value);
        }

        this.update();
    }.bind(this);

    /**
     * Уменьшает количество на единицу
     * @param event
     */
    dec = function (event) {
        const input = event.target.parentNode.querySelector('input[data-number]');

        if (input) {
            input.stepDown();
            this.changeNumber(input);
        }
        event.target.hasAttribute('disabled') && this.focus();
    }.bind(this);

    /**
     * Увеличивает количество на единицу
     * @param event
     */
    inc = function (event) {
        const input = event.target.parentNode.querySelector('input[data-number]');
        event.stopPropagation();

        if (input) {
            input.stepUp();
            this.changeNumber(input);
        }
        event.target.hasAttribute('disabled') && this.focus();
    }.bind(this);

    /**
     * Включить/отключить кнопку
     * @param type string   BUTTON_APPLY | BUTTON_CLEAR
     * @param disabled boolean
     */
    switchButton = function (type, disabled) {
        const button = this.$el.querySelector(`button[data-${ type }]`);
        if (!button) return;

        if (disabled) {
            !button.hasAttribute('disabled') && button.setAttribute('disabled', '');
        } else {
            button.hasAttribute('disabled') && button.removeAttribute('disabled');
        }
    }.bind(this);

    _activateButton(button) {
        button.hasAttribute('disabled') && button.removeAttribute('disabled');
    };

    _deactivateButton(button) {
        !button.hasAttribute('disabled') && button.setAttribute('disabled', '');
    };

    /**
     * Включить/отключить группу числовых кнопок
     */
    switchSpinButtons = function () {
        this.$objects.numberList.forEach((el, i) => {
            if (el.value ===  el.min) {
                this._deactivateButton(this.$objects.decButtons[i]);
                this._activateButton(this.$objects.incButtons[i]);

            } else if (el.value ===  el.max) {
                this._activateButton(this.$objects.decButtons[i]);
                this._deactivateButton(this.$objects.incButtons[i]);

            } else {
                this._activateButton(this.$objects.decButtons[i]);
                this._activateButton(this.$objects.incButtons[i]);
            }
        });
    }.bind(this);

    update = function () {
        const sum = this.data.list.reduce((sum, item) => sum + item.value, 0);
        const sumNew = this.data.list.reduce((sum, item) => sum + item.newValue, 0);

        this.switchButton(BUTTON_CLEAR, sum === this.cache.sumMinValues && sumNew === this.cache.sumMinValues);
        this.switchButton(BUTTON_APPLY, this.data.list.filter((el) => el.value !== el.newValue).length === 0);
        this.switchSpinButtons();

        if (sum === 0) {
            this.$objects.input.value = this.data.placeholder;

        } else if (this.data.single) {
            this.$objects.input.value = sum + ` ${ this.declOfNum(sum, this.data.list[0].units) }`;

        } else {
            this.$objects.input.value = this.data.list.reduce((result, el) => {
                if (el.value === 0) return result;

                if (result.length > 0) result += ', ';
                return `${ result }${ el.value } ${ this.declOfNum(el.value, el.units) }`;
            }, '');
        }
    }.bind(this);

    listUpdate = function () {
        const list = this.$el.querySelector('ul[data-list]');

        while (list.childNodes.length > 0) {
            list.removeChild(list.childNodes[0]);
        }
        list.insertAdjacentHTML('afterbegin', this._getListTemplate(this.data.list.length));

        const labelList = list.querySelectorAll('label[data-label]');
        this.$objects.decButtons = list.querySelectorAll('button[data-dec]');
        this.$objects.incButtons = list.querySelectorAll('button[data-inc]');
        this.$objects.numberList = list.querySelectorAll('input[data-number]');

        labelList.forEach((el, i) => el.textContent = this.data.list[i].label);

        this.$objects.decButtons.forEach((el) => {
            el.addEventListener('click', this.dec);
            el.addEventListener('blur', this.hide);
            el.addEventListener('focus', this.show);
        });

        this.$objects.incButtons.forEach((el) => {
            el.addEventListener('click', this.inc);
            el.addEventListener('blur', this.hide);
            el.addEventListener('focus', this.show);
        });

        this.$objects.numberList.forEach((el, i) => {
            el.setAttribute('min', this.data.list[i].min ?? 0);
            el.setAttribute('max', this.data.list[i].max ?? 9);
            el.setAttribute('data-key', i);
            el.setAttribute('value', this.data.list[i].value);
        });
    }.bind(this);

    render(app, node) {
        super.render(app, node);

        this.$objects = {
            input: this.$el.querySelector('input[data-input]'),
            dropdown: this.$el.querySelector('div[data-dropdown]'),
        };

        this.$el.querySelector('label[data-title]').textContent = this.data.title;
        this.$el.querySelector('button[data-clear]').addEventListener('click', this.clear);
        this.$el.querySelector('button[data-apply]').addEventListener('click', this.apply);
        this.$objects.dropdown.addEventListener('click', this.focus);

        this.listUpdate();
        this.update();
    };
}

export default cmSelect;
