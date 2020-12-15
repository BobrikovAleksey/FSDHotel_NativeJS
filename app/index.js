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

// import bulletList from '../components/bullet-list.js';
// import checkboxList from '../components/checkbox-list.js';
// import cmSelect from '../components/cm-select.js';
// import cmSelectExpanded from '../components/cm-select-expanded.js';
// import likeButton from '../components/like-button.js';
// import radioGroup from '../components/radio-group.js';
// import toggle from '../components/toggle.js';

const router = new Router({ mode: 'hash', root: '/' });

router
    .add(/about/, () => {
        app.renderPage(about);
    })
    .add(/services\/(.*)/, (service) => {
        app.renderPage(services, { service });
    })
    .add(/vacancies/, () => {
        app.renderPage(vacancies);
    })
    .add(/news/, () => {
        app.renderPage(news);
    })
    .add(/agreements\/(.*)/, (argument) => {
        app.renderPage(agreements, { argument });
    })
    .add('', () => {
        app.renderPage(uiKit);
    });

const app = {
    $router: router,
    $refs: {},

    components: {
        cmHeader,
        // 'bullet-list': bulletList,
        // 'checkbox-list': checkboxList,
        // 'cm-select': cmSelect,
        // cmSelectExpanded,
        // 'like-button': likeButton,
        // 'radio-group': radioGroup,
        // toggle,
    },

    /**
     * Обновляет главный контент страницы
     * @param template string
     * @param param object
     */
    renderPage(template, param = {}) {
        const page = document.querySelector('main');
        page.innerHTML = '';
        page.insertAdjacentHTML('afterbegin', template);
    },



    /**
     * Добавляет компонент в DOM
     * @param componentName string
     * @param refName string
     * @param params object
     */
    render(componentName, refName, params = {}) {
        const component = this.components[componentName];
        const node = document.querySelector(`${ component.getTag() }[ref="${ refName }"]`);

        if (node) {
            const object = new component(params);

            object.render(this, node);

            this.$refs[refName] = object;
        }
    },

    /**
     * Добавляет компонент в DOM
     * @param name
     */
    renderOld(name) {
        const nodeList = document.querySelectorAll(name);
        nodeList.forEach((item) => {
            const ref = item.hasAttribute('ref') ? item.getAttribute('ref') : null;
            const el = Object.assign(this.components[name]);
            item.insertAdjacentHTML('afterend', el.getElement(el));

            el.node = item.nextElementSibling;
            item.parentNode.removeChild(item);
            if (ref) {
                this.$refs[ref] = el;
            }
        });
    },
};

app.render(cmHeader.getType(), 'demoHeader', {});

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



