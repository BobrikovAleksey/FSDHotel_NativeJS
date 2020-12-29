import './libs/index.js';
import Router from './router.js';
import State from './state.js';

// views
import About from './views/about.js';
import Agreements from './views/agreements.js';
import LandingPage from './views/landing-page.js';
import News from './views/news.js';
import Services from './views/services.js';
import Vacancies from './views/vacancies.js';

// import uiKit from './views/ui-kit.js';

// cards
import CardSearch from './components/ui-kit/card-search.js';

// components
import Select from './components/ui-kit/select.js';
import RangeDatepicker from './components/ui-kit/range-datepicker.js';

import cmHeader from './components/cm-header.js';
import BulletList from './components/ui-kit/bullet-list.js';
import CheckboxList from './components/ui-kit/checkbox-list.js';
import LikeButton from './components/ui-kit/like-button.js';
import Pagination from './components/ui-kit/pagination.js';
import RadioGroup from './components/ui-kit/radio-group.js';
import Toggle from './components/ui-kit/toggle.js';

const $router = new Router({ mode: 'hash', root: '/' });
const $state = new State({ mode: 'hash', root: '/' });

const $config = {
    baseUrl: '/FSDHotel_Layout_html/#/',
    // baseUrl: '/#/',
};

$router
    .add(/about/, () => {
        app.getView('About');
    })
    .add(/agreements\/(.*)/, (argument) => {
        app.getView('Agreements', { argument });
    })
    .add(/news/, () => {
        app.getView('News');
    })
    .add(/services\/(.*)/, (service) => {
        app.getView('Services', { service });
    })
    .add(/vacancies/, () => {
        app.getView('Vacancies');
    })
    .add('', () => {
        app.getView('LandingPage');
    });

const $storage = {
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
    views: {
        About,
        Agreements,
        LandingPage,
        News,
        Services,
        Vacancies,
    },

    components: {
        CardSearch,
        RangeDatepicker,
        Select,

        cmHeader,
        BulletList,
        CheckboxList,
        LikeButton,
        Pagination,
        RadioGroup,
        Toggle,
    },

    $views: {
        $Root: null,
        $Current: null,
    },
    $refs: {},
    $config,
    $router,
    $state,
    $storage,
    $actions,
    $getters,

    getView(viewName, params = {}) {
        if (!this.$views.$Root) {
            this.$views.$Root = document.querySelector('main');
        }

        this.$views.$Current && this.$views.$Current.hide();

        if (this.$views.hasOwnProperty(viewName)) {
            this.$views[viewName].show();
            this.$views.$Current = this.$views[viewName];

            return;
        }

        const view = this.views[viewName];
        const newView = new view(params);

        newView.create(this, this.$views.$Root);
        this.$views.$Current = this.$views[viewName];
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
