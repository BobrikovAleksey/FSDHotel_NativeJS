import icons from './icons.js';


const template = `
    <!--suppress CheckTagEmptyBody -->
    <header class="header">
        <div class="header__container">
            <a class="header__logo" href="{{ url }}">${ icons.logo }</a>

            <ul class="menu">
                <li class="menu__item">
                    <a class="menu__link" href="{{ url }}about/" data-key="0">О нас</a>
                </li>

                <li class="menu__item menu__item_drop">
                    <p class="menu__link" data-key="1" tabindex="0">
                        Услуги<i class="material-icons">expand_more</i>
                    </p>

                    <div class="menu__dropdown hide">
                        <ul class="menu__submenu">
                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="{{ url }}services/1" data-key="1">Услуга</a>
                            </li>

                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="{{ url }}services/2" data-key="1">Услуга</a>
                            </li>

                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="{{ url }}services/3" data-key="1">Услуга</a>
                            </li>
                        </ul>               
                    </div>
                </li>

                <li class="menu__item">
                    <a class="menu__link" href="{{ url }}vacancies/" data-key="2">Вакансии</a>
                </li>

                <li class="menu__item">
                    <a class="menu__link" href="{{ url }}news/" data-key="3">Новости</a>
                </li>

                <li class="menu__item menu__item_drop">
                    <p class="menu__link" data-key="4" tabindex="0">
                        Соглашения<i class="material-icons">expand_more</i>
                    </p>

                    <div class="menu__dropdown hide">
                        <ul class="menu__submenu">
                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="{{ url }}agreements/1/" data-key="4">Соглашение</a>
                            </li>
                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="{{ url }}agreements/2/" data-key="4">Соглашение</a>
                            </li>
                            <li class="menu__sub-item">
                                <a class="menu__sub-link" href="{{ url }}agreements/3/" data-key="4">Соглашение</a>
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

            <span class="header__menu-icon" tabindex="0">
                <i class="material-icons icon-menu">menu</i>
                <i class="material-icons icon-close hide">close</i>
            </span>
        </div>
    </header>
`;

/**
 * Возвращает подготовленный html-шаблон
 * @param url string
 * @returns {string}
 */
const getTemplate = (url = '/#/') => {
    const urlPattern = /{{\s*url\s*}}/g;

    return template.replace(urlPattern, url);
};

const _switchSubmenuSm = (dropdown) => {
    if (dropdown.classList.contains('hide')) {
        dropdown.classList.remove('hide');
    } else {
        dropdown.classList.add('hide');
    }
}

const _switchSubmenuLg = (dropdown) => {
    if (dropdown.classList.contains('hide')) {
        dropdown.classList.remove('hide');
    } else {
        dropdown.classList.add('hide');
    }
}


class cmHeader {
    static getTag() { return 'cm-header'; };
    static getType() { return 'cmHeader'; };

    /**
     * Конструктор класса
     */
    constructor() {
        //
    };

    data = {
        //
    };

    actions = {
        /**
         * Обрабатывает клик по лого
         */
        clickLogo: function () {
            this.actions.switchMenu(null, false);
            this.actions.update();
        }.bind(this),

        /**
         * Обрабатывает клик по ссылкам главного меню
         */
        clickMenuLink: function () {
            this.actions.switchMenu(null, false);
            this.actions.update();
        }.bind(this),

        /**
         * Обрабатывает клик по регистрации
         */
        signUp: function () {
            this.$actions.logIn();
            this.actions.switchMenu(null, false);
            this.actions.update();
        }.bind(this),

        /**
         * Обрабатывает клик по входу
         */
        logIn: function () {
            this.$actions.logIn();
            this.actions.switchMenu(null, false);
            this.actions.update();
        }.bind(this),

        /**
         * Обрабатывает клик по выходу
         */
        logOut: function () {
            this.$actions.logOut();
            this.actions.switchMenu(null, false);
            this.actions.update();
        }.bind(this),

        /**
         * Показывает выпадающее меню по ключу, остальные скрывает
         * @param key string [data-key]
         */
        showMenuDropdown: function (key = '') {
            const items = this.$el.querySelectorAll('.menu__item_drop');

            items.forEach((el) => {
                const link = el.querySelector('.menu__link');
                const dropdown = el.querySelector('.menu__dropdown');

                if (link.hasAttribute('data-key') && link.getAttribute('data-key') === key) {
                    dropdown.classList.contains('hide') && dropdown.classList.remove('hide');
                } else {
                    !dropdown.classList.contains('hide') && dropdown.classList.add('hide');
                }
            });
        }.bind(this),

        /**
         * Скрывает все выпадающие меню
         */
        hideMenuDropdown: function () {
            this.actions.showMenuDropdown();
        }.bind(this),

        /**
         * Отображает/скрывает меню на малых разрешениях
         * @param event
         * @param visibility boolean|null
         */
        switchMenu: function (event, visibility = null) {
            if (document.body.clientWidth > 767) return;

            const menu = this.$el.querySelector('.menu').classList;
            const iconMenu = this.$el.querySelector('.icon-menu').classList;
            const iconClose = this.$el.querySelector('.icon-close').classList;

            if (typeof visibility !== 'boolean') {
                visibility = !menu.contains('menu__show');
            }

            this.actions.hideMenuDropdown();

            if (visibility) {
                !menu.contains('menu__show') && menu.add('menu__show');
                !iconMenu.contains('hide') && iconMenu.add('hide');
                iconClose.contains('hide') && iconClose.remove('hide');

            } else {
                menu.contains('menu__show') && menu.remove('menu__show');
                iconMenu.contains('hide') && iconMenu.remove('hide');
                !iconClose.contains('hide') && iconClose.add('hide');
            }
        }.bind(this),

        /**
         * Отображает/скрывает выпадающее меню на малых разрешениях
         * @param event
         */
        switchSubmenu: function (event) {
            const dropdown = event.target.parentNode.querySelector('.menu__dropdown');
            if (document.body.clientWidth < 768) {
                _switchSubmenuSm(dropdown);
            } else {
                _switchSubmenuLg(dropdown);
            }
        }.bind(this),

        /**
         * Обновляет меню
         */
        update: function () {
            setTimeout(() => {
                const items = this.$el.querySelectorAll('.menu__link');

                items.forEach((el) => {
                    if (Number(el.getAttribute('data-key')) === this.$getters.getPage()) {
                        !el.classList.contains('menu__link_active') && el.classList.add('menu__link_active');
                    } else {
                        el.classList.contains('menu__link_active') && el.classList.remove('menu__link_active');
                    }
                });
            }, 50);

            const buttons = this.$el.querySelectorAll('button.menu__button');
            const account = this.$el.querySelector('.menu__item.menu__account');

            if (this.$getters.getLogIn()) {
                account.classList.contains('hide') && account.classList.remove('hide');
                buttons.forEach((el) => {
                    !el.parentElement.classList.contains('hide') && el.parentElement.classList.add('hide');
                });

            } else {
                buttons.forEach((el) => {
                    el.parentElement.classList.contains('hide') && el.parentElement.classList.remove('hide');
                });
                !account.classList.contains('hide') && account.classList.add('hide');
            }
        }.bind(this),
    };

    getters = {
        //
    };

    /**
     * Размещает html-элемент в DOM вместо указанного
     * @param app
     * @param node
     */
    render(app, node) {
        this.$app = app;
        this.$refs = this.$app.$refs;
        this.$router = this.$app.$router;
        this.$storage = this.$app.$storage;
        this.$actions = this.$app.$actions;
        this.$getters = this.$app.$getters;

        node.insertAdjacentHTML('afterend', getTemplate(this.$app.$config.baseUrl));
        this.$el = node.nextElementSibling;
        node.parentNode.removeChild(node);

        // logo
        let item = this.$el.querySelector('a.header__logo');
        item.addEventListener('click', this.actions.clickLogo);
        item.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.actions.clickLogo();
        });

        // log in
        item = this.$el.querySelector('button.button_white');
        item.addEventListener('click', this.actions.logIn);
        item.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.actions.logIn();
        });

        // sign up
        item = this.$el.querySelector('button:not(.button_white)');
        item.addEventListener('click', this.actions.signUp);
        item.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.actions.signUp();
        });

        // account
        item = this.$el.querySelector('li.menu__item.menu__account');
        item.addEventListener('click', this.actions.logOut);
        item.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.actions.logOut();
        });

        // links
        let items = [].slice.call(this.$el.querySelectorAll('a.menu__link')).concat(
            [].slice.call(this.$el.querySelectorAll('a.menu__sub-link'))
        );
        items.forEach((el) => el.addEventListener('click', this.actions.clickMenuLink));

        // drop
        items = this.$el.querySelectorAll('p.menu__link');
        items.forEach((el) => el.addEventListener('click', this.actions.switchSubmenu));
        item.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.actions.switchSubmenu(event);
        });

        item = this.$el.querySelector('span.header__menu-icon');
        item.addEventListener('click', this.actions.switchMenu);
        item.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.actions.switchMenu(event);
        });

        this.actions.update();
    };
}

export default cmHeader;
