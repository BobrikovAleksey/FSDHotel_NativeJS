import bulletList from '../components/bullet-list.js';
import checkboxList from '../components/checkbox-list.js';
import likeButton from '../components/like-button.js';
import radioGroup from '../components/radio-group.js';
import toggle from '../components/toggle.js';

const app = {
    components: {
        'bullet-list': bulletList,
        'checkbox-list': checkboxList,
        'like-button': likeButton,
        'radio-group': radioGroup,
        toggle,
    },
    refs: {},

    /**
     * Добавляет компонент в DOM
     * @param name
     */
    render(name) {
        const nodeList = document.querySelectorAll(name);
        nodeList.forEach((item) => {
            const ref = item.hasAttribute('ref') ? item.getAttribute('ref') : null;
            const el = Object.assign(this.components[name]);
            item.insertAdjacentHTML('afterend', el.getElement(el));

            el.node = item.nextElementSibling;
            item.parentNode.removeChild(item);
            if (ref) {
                this.refs[ref] = el;
            }
        });
    },
};

app.render('bullet-list');
app.render('checkbox-list');
app.render('like-button');
app.render('radio-group');
app.render('toggle');
