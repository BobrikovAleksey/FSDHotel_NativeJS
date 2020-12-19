'use strict';

import Router from './router.js';
import State from './state.js';

// views
import about from './views/about.js';
import agreements from './views/agreements.js';
import news from './views/news.js';
import services from './views/services.js';
import vacancies from './views/vacancies.js';
import uiKit from './views/ui-kit.js';

// components
import cmHeader from './components/cm-header.js';
import BulletList from './components/ui-kit/bullet-list.js';
import CheckboxList from './components/ui-kit/checkbox-list.js';
import LikeButton from './components/ui-kit/like-button.js';
import Pagination from './components/ui-kit/pagination.js';
import RadioGroup from './components/ui-kit/radio-group.js';
import Toggle from './components/ui-kit/Toggle.js';

// import cmSelect from '../components/cm-select.js';
// import cmSelectExpanded from '../components/cm-select-expanded.js';

const $config = {
    baseUrl: '/FSDHotel_Layout_html/#/',
    // baseUrl: '/#/',
};

const $router = new Router({ mode: 'hash', root: '/' });
const $state = new State({ mode: 'hash', root: '/' });

$router
    .add(/about/, () => {
        app.renderView(about, {
            view: 0,
        });
    })
    .add(/services\/(.*)/, (service) => {
        app.renderView(services, {
            view: 1,
            service,
        });
    })
    .add(/vacancies/, () => {
        app.renderView(vacancies, {
            view: 2,
        });
    })
    .add(/news/, () => {
        app.renderView(news, {
            view: 3,
        });
    })
    .add(/agreements\/(.*)/, (argument) => {
        app.renderView(agreements, {
            view: 4,
            argument,
        });
    })
    .add('', () => {
        app.renderView(uiKit);
    });

const $storage = {
    view: -1,
    page: 0,
    logIn: false,
};

const $actions = {
    /** @param view number */
    setView: (view) => $storage.view = view,
    /** @param logIn boolean */
    logIn: (logIn = true) => $storage.logIn = logIn,
    logOut: () => $storage.logIn = false,
};

const $getters = {
    getLogIn: () => $storage.logIn,
    getView: () => $storage.view,
};

const app = {
    components: {
        [cmHeader.getType()]: cmHeader,
        [BulletList.getType()]: BulletList,
        [CheckboxList.getType()]: CheckboxList,
        [LikeButton.getType()]: LikeButton,
        [Pagination.getType()]: Pagination,
        [RadioGroup.getType()]: RadioGroup,
        [Toggle.getType()]: Toggle,

        // 'cm-select': cmSelect,
        // cmSelectExpanded,
    },

    $refs: {},
    $config,
    $router,
    $state,
    $storage,
    $actions,
    $getters,

    /**
     * Обновляет главный контент страницы
     * @param view object
     * @param params object
     */
    renderView(view, params = {}) {
        this.$actions.setView(params.view ?? -1);

        const content = document.querySelector('main');

        content.innerHTML = '';
        content.insertAdjacentHTML('afterbegin', view['template']);

        view['components'].forEach((el) => {
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
