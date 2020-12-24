import Router from './router.js';
import State from './state.js';

// views
import About from './views/about.js';
import Agreements from './views/agreements.js';
import LandingPage from './views/landing-page.js';
import News from './views/news.js';
import Services from './views/services.js';
import Vacancies from './views/vacancies.js';

import uiKit from './views/ui-kit.js';

// components
import cmHeader from './components/cm-header.js';
import BulletList from './components/ui-kit/bullet-list.js';
import CheckboxList from './components/ui-kit/checkbox-list.js';
import cmSelect from './components/ui-kit/cm-select.js';
import LikeButton from './components/ui-kit/like-button.js';
import Pagination from './components/ui-kit/pagination.js';
import RadioGroup from './components/ui-kit/radio-group.js';
import Toggle from './components/ui-kit/toggle.js';

const $config = {
    baseUrl: '/FSDHotel_Layout_html/#/',
    // baseUrl: '/#/',
};

const $router = new Router({ mode: 'hash', root: '/' });
const $state = new State({ mode: 'hash', root: '/' });

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
    views: {
        About,
        Agreements,
        LandingPage,
        News,
        Services,
        Vacancies,
    },

    components: {
        [cmHeader.getType()]: cmHeader,
        [BulletList.getType()]: BulletList,
        [CheckboxList.getType()]: CheckboxList,
        [cmSelect.getType()]: cmSelect,
        [LikeButton.getType()]: LikeButton,
        [Pagination.getType()]: Pagination,
        [RadioGroup.getType()]: RadioGroup,
        [Toggle.getType()]: Toggle,
    },

    $views: {
        Root: null,
        Current: null,
    },
    $refs: {},
    $config,
    $router,
    $state,
    $storage,
    $actions,
    $getters,

    getView(viewName, params = {}) {
        if (!this.$views.Root) {
            this.$views.Root = document.querySelector('main');
        }

        if (this.$views.Current) {
            this.$views.Current.hide();
        }

        if (this.$views.hasOwnProperty(viewName)) {
            this.$views[viewName].show();
            this.$views.Current = this.$views[viewName];
            return;
        }

        const view = this.views[viewName];
        const viewObject = new view(params);

        viewObject.create(this, this.$views.Root);
        this.$views.Current = this.$views[viewName];
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
