import BaseComponent from './base-component.js';

class RangeDatepicker extends BaseComponent {
    template = `
        <div class="range-datepicker">
            <h3 class="range-datepicker__label">
                <span> </span>
                <span> </span>
            </h3>

            <div class="range-datepicker__button-panel">
                <button class="range-datepicker__button" type="button"> </button>
                <button class="range-datepicker__button" type="button"> </button>
            </div>

            <div class="range-datepicker__dropdown"> </div>
        </div>
    `;

    static getTag = () => 'x-range-datepicker';
    static getType = () => 'RangeDatepicker';

    constructor({ name, placeholder = '', titles = ['', ''] } = {}) {
        super({ placeholder, titles, values: [ null, null ] });

        if (typeof name === 'string') this.$name = name;

        this.setDates(this.$state.dates = {});

        this.cache = {
            mouse: false,
            dates: { ...this.$state.dates },
        };
    };

    /** Сохраняет выбранные даты */
    apply = function () {
        this.$state.dates = { ...this.cache.dates };
        this.$nodes.datepicker.classList.contains('range-datepicker__dropdown_show')
            && this.$nodes.datepicker.classList.remove('range-datepicker__dropdown_show');

        this.update();
    }.bind(this);

    /** Очищает выбранные даты */
    clear = function () {
        this.setDates(this.$state.dates);
        this.cache.dates = { ...this.$state.dates };

        this.cache.datepicker.datepicker('option', 'currentText', 'Now');
        this.cache.datepicker.datepicker('setDate', [ this.cache.dates.startDate, this.cache.dates.endDate ]);

        this.update();
    }.bind(this);

    /**
     * Обрабатывает выбор дат
     */
    selectDate = function (dateText, inst, extensionRange) {
        this.setDates(this.cache.dates, extensionRange);

        this.update();
    }.bind(this);

    /**
     * Включить/отключить кнопку
     * @param button NodeElement
     * @param disabled boolean
     */
    switchButton = function (button, disabled) {
        if (disabled) {
            !button.hasAttribute('disabled') && button.setAttribute('disabled', '');
        } else {
            button.hasAttribute('disabled') && button.removeAttribute('disabled');
        }
    }.bind(this);

    /** Обновляет поля с датами и кнопки очистки и сохранения изменений */
    update = function () {
        this.$nodes.values[0].textContent = this.$state.dates.startDateText;
        this.$nodes.values[1].textContent = this.$state.dates.endDateText;

        this.switchButton(this.$nodes.clear, this.cache.dates.startDate === null
            && this.$state.dates.startDate === null);
        this.switchButton(this.$nodes.apply, this.cache.dates.startDateText === this.$state.dates.startDateText
            && this.cache.dates.endDateText === this.$state.dates.endDateText);
    }.bind(this);

    /** Размещает объект datepicker */
    renderDatepicker = function () {
        this.cache.datepicker = $('.range-datepicker__dropdown');

        this.cache.datepicker.datepicker({
            range: 'period',
            prevText: 'arrow_back',
            nextText: 'arrow_forward',
            showOtherMonths: true,
            minDate: new Date(),
            endDate: null,
            onSelect: this.selectDate,
            onClose: () => console.log('click'),
        });
    }.bind(this);

    /**
     * Устанавливает параметры даты в указанном состоянии
     * @param state
     * @param endDate
     * @param endDateText
     * @param startDate
     * @param startDateText
     */
    setDates = function (state, { endDate = null, endDateText = '', startDate = null, startDateText = '' } = {}) {
        state.endDate = endDate;
        state.endDateText = endDate ? endDateText : this.$state.placeholder;
        state.startDate = startDate;
        state.startDateText = startDate ? startDateText : this.$state.placeholder;
    }.bind(this);

    /** Обработка скрытия и отображения календаря */

    mouseEnter = function () {
        this.cache.mouse = true;
    }.bind(this);

    mouseLeave = function () {
        this.cache.mouse = false;
    }.bind(this);

    hideCalendar = function () {
        if (this.cache.mouse) return;

        this.$nodes.datepicker.classList.contains('range-datepicker__dropdown_show')
        && this.$nodes.datepicker.classList.remove('range-datepicker__dropdown_show');
    }.bind(this);

    switchCalendar = function () {
        if (this.$nodes.datepicker.classList.contains('range-datepicker__dropdown_show')) {
            this.$nodes.datepicker.classList.remove('range-datepicker__dropdown_show');
        } else {
            this.cache.dates = { ...this.$state.dates };
            this.cache.datepicker.datepicker('setDate', [ this.cache.dates.startDate, this.cache.dates.endDate ]);

            this.$nodes.datepicker.classList.add('range-datepicker__dropdown_show');
        }
    }.bind(this);

    create(app, node, storage = null) {
        super.create(app, node, storage);

        this.renderDatepicker();

        this.$nodes = {
            datepicker: this.$el.querySelector('.range-datepicker__dropdown'),
            values: this.$el.querySelectorAll('.range-datepicker__button'),
        };

        this.$nodes.datepicker.insertAdjacentHTML('beforeend', `
            <div class="ui-datepicker-button-panel">
                <button class="button ui-datepicker-clear">Очистить</button>
                <button class="button ui-datepicker-apply">Применить</button>
            </div>
        `);

        this.$nodes.apply = this.$el.querySelector('.ui-datepicker-apply');
        this.$nodes.clear = this.$el.querySelector('.ui-datepicker-clear');

        this.$el.querySelectorAll('.range-datepicker__label span').forEach((el, i) => el.textContent = this.$state.titles[i]);

        document.addEventListener('mousedown', this.hideCalendar);
        this.$nodes.datepicker.addEventListener('mouseenter', this.mouseEnter);
        this.$nodes.datepicker.addEventListener('mouseleave', this.mouseLeave);
        this.$nodes.values.forEach((el) => {
            el.addEventListener('click', this.switchCalendar);
            el.addEventListener('mouseenter', this.mouseEnter);
            el.addEventListener('mouseleave', this.mouseLeave);
        });

        this.$nodes.apply.addEventListener('click', this.apply);
        this.$nodes.clear.addEventListener('click', this.clear);

        this.update();
    };
}

export default RangeDatepicker;
