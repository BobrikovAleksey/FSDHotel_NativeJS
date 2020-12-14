import icons from './icons.js';

const template = `
    <header class="header">
        <div class="header__container">
            <a class="header__logo" href="/">${ icons.logo }</a>

            <ul class="menu">
                <li class="menu__item"><a class="menu__link" href="#">О нас</a></li>

                <li class="menu__item">
                    <a class="menu__link" href="#">Услуги<i class="material-icons">expand_more</i></a>
                </li>

                <li class="menu__item"><a class="menu__link" href="#">Вакансии</a></li>

                <li class="menu__item"><a class="menu__link" href="#">Новости</a></li>

                <li class="menu__item">
                    <a class="menu__link" href="#">Соглашения<i class="material-icons">expand_more</i></a>
                </li>

                <li class="menu__item">
                    <button class="button button_white menu__button">
                        <span>Войти</span>
                        <i class="material-icons">login</i>
                    </button>
                </li>

                <li class="menu__item">
                    <button class="button menu__button">
                        <span>Зарегистрироваться</span>
                    </button>
                </li>

                <li class="menu__item menu__account menu__hide">
                    <p>Юлий Цезарь</p>
                </li>
            </ul>

            <i class="material-icons menu__icon">menu</i>
        </div>
    </header>
`;

/**
 * Возвращает подготовленный html-шаблон
 * @param data
 * @returns {string}
 */
const getTemplate = (data) => {
    // const titlePattern = /{{\s*title\s*}}/g;
    // const currentPattern = /{{\s*current\s*}}/g;
    // const listPattern = /{{\s*list\s*}}/g;
    //
    // let html = template.replace(titlePattern, data.title);
    // html = html.replace(currentPattern,  data.placeholder);
    // html = html.replace(listPattern, getListTemplate(data.list));
    //
    // return html;
};


class cmHeader {
    /**
     * Конструктор класса
     */
    constructor() {
    }

    static getTag() {
        return 'cm-header';
    };

    static getType() {
        return 'cmHeader';
    };

    /**
     * Размещает html-элемент в DOM вместо указанного
     * @param node
     */
    render(node) {
        // const template = getTemplate(this.data);

        node.insertAdjacentHTML('afterend', template);
        this.node = node.nextElementSibling;
        node.parentNode.removeChild(node);
    }
}

export default cmHeader;
