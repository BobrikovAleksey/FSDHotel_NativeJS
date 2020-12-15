import icons from './icons.js';


const template = `
    <header class="header">
        <div class="header__container">
            <a class="header__logo" href="/#">${ icons.logo }</a>

            <ul class="menu">
                <li class="menu__item">
                    <a class="menu__link" href="/#/about/" data-key="0">О нас</a>
                </li>

                <li class="menu__item menu__item_drop">
                    <p class="menu__link" data-key="1">
                        Услуги<i class="material-icons">expand_more</i>
                    </p>

                    <div class="menu__dropdown menu__hide">
                        <ul class="menu__submenu">
                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="/#/services/1" data-key="1">Услуга</a>
                            </li>

                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="/#/services/2" data-key="1">Услуга</a>
                            </li>

                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="/#/services/3" data-key="1">Услуга</a>
                            </li>
                        </ul>               
                    </div>
                </li>

                <li class="menu__item">
                    <a class="menu__link" href="/#/vacancies/" data-key="2">Вакансии</a>
                </li>

                <li class="menu__item">
                    <a class="menu__link" href="/#/news/" data-key="3">Новости</a>
                </li>

                <li class="menu__item menu__item_drop">
                    <p class="menu__link" data-key="4">
                        Соглашения<i class="material-icons">expand_more</i>
                    </p>

                    <div class="menu__dropdown menu__hide">
                        <ul class="menu__submenu">
                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="/#/agreements/1/" data-key="4">Соглашение</a>
                            </li>
                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="/#/agreements/2/" data-key="4">Соглашение</a>
                            </li>
                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="/#/agreements/3/" data-key="4">Соглашение</a>
                            </li>
                        </ul>               
                    </div>
                </li>

                <li class="menu__item">
                    <button class="button button_white menu__button">
                        <span>Войти</span>
                        <i class="fa fa-sign-in"></i>
                    </button>
                </li>

                <li class="menu__item">
                    <button class="button menu__button">
                        <span>Зарегистрироваться</span>
                        <i class="fa fa-user-plus"></i>
                    </button>
                </li>

                <li class="menu__item menu__account">
                    <p>Юлий Цезарь</p>
                </li>
            </ul>

            <span class="menu__icon">
                <i class="material-icons">menu</i>
            </span>
        </div>
    </header>
`;

const data = {
    $app: null,
    $el: null,
    $refs: null,
    $router: null,

    active: 0,
    login: false,
};


/**
 * Показывает выпадающее меню
 * @param key
 */
const showDropdown = (key = -1) => {
    const sKey = String(key);
    const items = data.$el.querySelectorAll('.menu__dropdown');

    items.forEach((el) => {
        if (!el.hasAttribute('data-key')) return;

        if (el.getAttribute('data-key') === sKey) {
            if (el.classList.contains('menu__hide')) {
                el.classList.remove('menu__hide');
            }
        } else {
            if (!el.classList.contains('menu__hide')) {
                el.classList.add('menu__hide');
            }
        }
    });
};

/**
 * Клик по ссылкам главного меню
 * @param event
 */
const clickMenuLink = (event) => {
    const el = event.target;

    if (!el.hasAttribute('data-key')) return;
    const key = event.target.getAttribute('data-key');
    const items = data.$el.querySelectorAll('.menu__link');

    items.forEach((el) => {
        if (el.hasAttribute('data-key') && el.getAttribute('data-key') === key) {
            if (!el.classList.contains('menu__link_active')) {
                el.classList.add('menu__link_active');
            }
        } else {
            if (el.classList.contains('menu__link_active')) {
                el.classList.remove('menu__link_active');
            }
        }
    });

    data.active = Number(key);
};

const switchMenuDrop = (event) => {
    const el = event.target.nextElementSibling;
    if (!el.hasAttribute('data-key')) {
        showDropdown();
        return;
    }

    showDropdown(el.getAttribute('data-key'));
};


class cmHeader {
    static getTag() { return 'cm-header'; };
    static getType() { return 'cmHeader'; };

    /**
     * Конструктор класса
     * @param object { active: number, login: boolean }
     */
    constructor({ active = 0, login = false } = {}) {
        data.active = typeof active === 'number' ? active : 0;
        data.login = typeof login === 'boolean' ? login : false;
    };

    actions() { return {

    };};

    getters() { return {
        getActive: () => data.active,
        getApp: () => data.$app,
        getEl: () => data.$el,
        isLogin: () => data.login,
    };};

    /**
     * Размещает html-элемент в DOM вместо указанного
     * @param app
     * @param node
     */
    render(app, node) {
        node.insertAdjacentHTML('afterend', template);
        data.$app = app;
        data.$refs = app.$refs;
        data.$router = app.$router;
        data.$el = node.nextElementSibling;
        node.parentNode.removeChild(node);

        let items = data.$el.querySelectorAll('.menu__link[href]');
        if (data.active < 0 || data.active >= items.length) data.active = 0;
        items[data.active].classList.add('menu__link_active');
        items.forEach((el) => el.addEventListener('click', clickMenuLink));

        items = data.$el.querySelectorAll('.menu__sub-link[href]');
        items.forEach((el) => el.addEventListener('click', clickMenuLink));

        items = data.$el.querySelectorAll('p.menu__link');
        items.forEach((el) => el.addEventListener('click', switchMenuDrop));

        if (data.login) {
            items = data.$el.querySelectorAll('.menu__item .menu__button');
            items.forEach((el) => {
                el.parentElement.classList.add('menu__hide');
            });
        } else {
            const item = data.$el.querySelector('.menu__item.menu__account');
            item.classList.add('menu__hide');
        }
    };
}

export default cmHeader;
