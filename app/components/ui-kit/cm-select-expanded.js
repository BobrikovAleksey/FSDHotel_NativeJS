'use strict';

const template = `
    <div class="select">
        <label class="select__label">{{ title }}</label>

        <div class="select__container">
            <input class="select__input" type="button" value="{{ current }}" />

            <span class="select__icon">
                <i class="material-icons">expand_more</i>
            </span>

            <div class="select__list">
                <ul>{{ list }}</ul>

                <div class="select__control-panel">
                    <button data-clear>Очистить</button>

                    <button data-apply>Применить</button>
                </div>
            </div>
        </div>
    </div>
`;

const getListTemplate = (list) => {
    let template = '';

    for (let i = 0; i < list.length; i++) {
        template += `
            <li class="select__item select__item_no-action" value="${ list[i].name }">
                <span class="select__title">${ list[i].title }</span>

                <div class="select__number">
                    <button class="select__spin-button" data-dec>-</button>

                    <input type="number" data-key="${ i }" min="${ list[i].min }" max="${ list[i].max }"
                           value="${ list[i].value }" />

                    <button class="select__spin-button" data-inc>+</button>
                </div>
            </li>`;
    }

    return template;
};

/**
 * Возвращает подготовленный html-шаблон
 * @param data
 * @returns {string}
 */
const getTemplate = (data) => {
    const titlePattern = /{{\s*title\s*}}/g;
    const currentPattern = /{{\s*current\s*}}/g;
    const listPattern = /{{\s*list\s*}}/g;

    let html = template.replace(titlePattern, data.title);
    html = html.replace(currentPattern,  data.placeholder);
    html = html.replace(listPattern, getListTemplate(data.list));

    return html;
};

/**
 * Возвращает подходящее склонение в зависимости от числа
 * @param num
 * @param units array['предмет', 'предмета', 'предметов']
 * @returns {*}
 */
const declOfNum = (num, units) => {
    if (!Array.isArray(units)) {
        units = [ '', '', '' ];
    } else {
        while (units.length < 3) {
            units.push('');
        }
    }

    num = Math.abs(num) % 100;
    if (num > 10 && num < 20) return units[2];

    num %= 10;
    if (num > 1 && num < 5) return units[1];
    if (num === 1) return units[0];
    return units[2];
}


class cmSelectExpanded {
    // noinspection JSClosureCompilerSyntax
    /**
     * Конструктор класса
     * @param params { list: array { name string, title string, units array(3), min: number, max: number, value: number }
     *                 type: 'single'|'list',
     *                 title: string,
     *                 placeholder: string }
     */
    constructor(params = { list: [], title: '', placeholder: '' }) {
        if (!params.hasOwnProperty('list') || !Array.isArray(params.list)) {
            params.list = [];
        }
        if (!params.hasOwnProperty('type') || typeof params.type !== 'string' || params.type !== 'list') {
            params.type = 'single';
        }
        if (!params.hasOwnProperty('title') || typeof params.title !== 'string') {
            params.title = '';
        }
        if (!params.hasOwnProperty('placeholder') || typeof params.placeholder !== 'string') {
            params.placeholder = '';
        }
        this.data = { ...params };

        this.data.list.forEach((item) => item.newValue = item.value);
    }

    static getTag() {
        return 'cm-select-expanded'
    };

    static getType() {
        return 'cmSelectExpanded'
    };

    /**
     * Сохраняет изменения
     */
    apply() {
        this.focus();

        this.data.list.forEach((item) => {
            item.value = item.newValue;
        });

        this.updateSelect();
    };

    /**
     * Очищает поле
     */
    clear() {
        this.focus();

        let inputList = this.node.querySelectorAll('.select__number input[type="number"]');

        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i].hasAttribute('min')) {
                inputList[i].value = inputList[i].getAttribute('min');
                this.data.list[i].value = Number(inputList[i].value);
                this.data.list[i].newValue = this.data.list[i].value;

            } else {
                inputList[i].value = 0;
                this.data.list[i].value = 0;
                this.data.list[i].newValue = 0;
            }
        }

        this.updateSelect();
    };

    focus() {
        this.node.querySelector('.select__input').focus();
    };

    /**
     * Уменьшает количество на единицу
     * @param event
     */
    dec(event) {
        this.focus();

        const input = event.target.parentNode.querySelector('input[type="number"]');
        input.stepDown();

        if (input.hasAttribute('data-key')) {
            const key = input.getAttribute('data-key');
            this.data.list[key].newValue = Number(input.value);
        }

        this.updateSelect();
    };

    /**
     * Увеличивает количество на единицу
     * @param event
     */
    inc(event) {
        this.focus();

        const input = event.target.parentNode.querySelector('input[type="number"]');
        input.stepUp();

        if (input.hasAttribute('data-key')) {
            const key = input.getAttribute('data-key');
            this.data.list[key].newValue = Number(input.value);
        }

        this.updateSelect();
    };

    /**
     * Включить/отключить кнопку
     * @param pos boolean
     * @param dataAttr string
     */
    switchButton(pos, dataAttr) {
        const button = this.node.querySelector(`.button-link[${ dataAttr }]`);
        if (!pos && !button.hasAttribute('disabled')) {
            button.setAttribute('disabled', '');
        } else if (button.hasAttribute('disabled')) {
            button.removeAttribute('disabled');
        }
    }

    /**
     * Включить/отключить группу числовых кнопок
     */
    switchSpinButtons() {
        const inputList = this.node.querySelectorAll('.select__number input[type="number"]');
        const buttonListInc = this.node.querySelectorAll('.select__number button[data-inc]');
        const buttonListDec = this.node.querySelectorAll('.select__number button[data-dec]');

        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i].value ===  inputList[i].min) {
                if (!buttonListDec[i].hasAttribute('disabled')) {
                    buttonListDec[i].setAttribute('disabled', '');
                }
                if (buttonListInc[i].hasAttribute('disabled')) {
                    buttonListInc[i].removeAttribute('disabled');
                }

            } else if (inputList[i].value ===  inputList[i].max) {
                if (!buttonListInc[i].hasAttribute('disabled')) {
                    buttonListInc[i].setAttribute('disabled', '');
                }
                if (buttonListDec[i].hasAttribute('disabled')) {
                    buttonListDec[i].removeAttribute('disabled');
                }

            } else {
                if (buttonListInc[i].hasAttribute('disabled')) {
                    buttonListInc[i].removeAttribute('disabled');
                }
                if (buttonListDec[i].hasAttribute('disabled')) {
                    buttonListDec[i].removeAttribute('disabled');
                }
            }
        }
    }

    /**
     * Обновляет состояние узла
     */
    updateSelect() {
        const select = this.node.querySelector('.select__input');
        const sum = this.data.list.reduce((sum, item) => sum + item.value, 0);
        const sumNew = this.data.list.reduce((sum, item) => sum + item.newValue, 0);

        this.switchButton(sum > 0 || sumNew > 0, 'data-clear');
        this.switchButton(this.data.list.filter((el) => el.value !== el.newValue).length > 0, 'data-apply');

        if (sum === 0) {
            select.value = this.data.placeholder;

        } else if (this.data.type === 'single') {
            select.value = sum + ` ${ declOfNum(sum, this.data.list[0].units) }`;

        } else {
            select.value = this.data.list.reduce((res, item) => {
                if (res.length > 0) res += ', ';
                return `${ res }${ item.value } ${ declOfNum(item.value, item.units) }`;
            }, '');
        }

        this.switchSpinButtons();
    };

    /**
     * Размещает html-элемент в DOM вместо указанного
     * @param node
     */
    render(node) {
        const template = getTemplate(this.data);

        node.insertAdjacentHTML('afterend', template);
        this.node = node.nextElementSibling;
        node.parentNode.removeChild(node);

        let buttonsList = this.node.querySelectorAll('button[data-inc]');
        buttonsList.forEach((el) => el.addEventListener('click', this.inc.bind(this)));

        buttonsList = this.node.querySelectorAll('button[data-dec]');
        buttonsList.forEach((el) => el.addEventListener('click', this.dec.bind(this)));

        let button = this.node.querySelector('button[data-clear]');
        button.addEventListener('click', this.clear.bind(this));

        button = this.node.querySelector('button[data-apply]');
        button.addEventListener('click', this.apply.bind(this));

        const list = this.node.querySelector('.select__list');
        list.addEventListener('click', this.focus.bind(this));

        this.updateSelect();
    }
}

export default cmSelectExpanded;
