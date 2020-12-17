'use strict';

import Router from './router.js';

// pages
import about from './pages/about.js';
import agreements from './pages/agreements.js';
import news from './pages/news.js';
import services from './pages/services.js';
import vacancies from './pages/vacancies.js';
import uiKit from './pages/ui-kit.js';

// components
import cmHeader from './components/cm-header.js';
import BulletList from './components/ui-kit/bullet-list.js';
// import checkboxList from '../components/checkbox-list.js';
// import cmSelect from '../components/cm-select.js';
// import cmSelectExpanded from '../components/cm-select-expanded.js';
// import likeButton from '../components/like-button.js';
// import radioGroup from '../components/radio-group.js';
// import toggle from '../components/toggle.js';

const $config = {
    baseUrl: '/FSDHotel_Layout_html/#/',
    // baseUrl: '/#/',
};

const $router = new Router({ mode: 'hash', root: '/' });

$router
    .add(/about/, () => {
        app.renderPage(about, {
            page: 0,
        });
    })
    .add(/services\/(.*)/, (service) => {
        app.renderPage(services, {
            page: 1,
            service,
        });
    })
    .add(/vacancies/, () => {
        app.renderPage(vacancies, {
            page: 2,
        });
    })
    .add(/news/, () => {
        app.renderPage(news, {
            page: 3,
        });
    })
    .add(/agreements\/(.*)/, (argument) => {
        app.renderPage(agreements, {
            page: 4,
            argument,
        });
    })
    .add('', () => {
        app.renderPage(uiKit);
    });

const $storage = {
    page: -1,
    logIn: false,
};

const $actions = {
    /** @param page number */
    setPage: (page) => $storage.page = page,
    /** @param logIn boolean */
    logIn: (logIn = true) => $storage.logIn = logIn,
    logOut: () => $storage.logIn = false,
};

const $getters = {
    getLogIn: () => $storage.logIn,
    getPage: () => $storage.page,
};

const app = {
    components: {
        [cmHeader.getType()]: cmHeader,
        [BulletList.getType()]: BulletList,
        // 'checkbox-list': checkboxList,
        // 'cm-select': cmSelect,
        // cmSelectExpanded,
        // 'like-button': likeButton,
        // 'radio-group': radioGroup,
        // toggle,
    },

    $refs: {},
    $config,
    $router,
    $storage,
    $actions,
    $getters,

    /**
     * Обновляет главный контент страницы
     * @param page object
     * @param params object
     */
    renderPage(page, params = {}) {
        this.$actions.setPage(params.page ?? -1);

        const content = document.querySelector('main');

        content.innerHTML = '';
        content.insertAdjacentHTML('afterbegin', page['template']);

        page['components'].forEach((el) => {
            this.renderComponent(this.components[el['name']].getType(), el['ref'], el['params']);
        });
    },

    /**
     * Добавляет компонент в DOM
     * @param componentName string
     * @param refName string
     * @param params object
     */
    renderComponent(componentName, refName, params = {}) {
        const component = this.components[componentName];
        const node = document.querySelector(`${ component.getTag() }[ref="${ refName }"]`);

        if (node) {
            const object = new component(params);

            object.render(this, node);
            this.$refs[refName] = object;
        }
    },
};

app.renderComponent(cmHeader.getType(), 'demoHeader', {});

// app.render(cmSelectExpanded.getType(), 'demoCmSelectExpended', {
//     type: 'single',
//     list: [
//         { name: 'adults', title: 'Взрослые', units: [ 'гость', 'гостя', 'гостей' ], min: 0, max: 9, value: 2 },
//         { name: 'children', title: 'Дети', min: 0, max: 9, value: 1 },
//         { name: 'babies', title: 'Младенцы', min: 0, max: 9, value: 0 },
//     ],
//     placeholder: 'Сколько гостей',
//     title: 'Dropdown',
// });





