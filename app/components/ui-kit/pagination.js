'use strict';

import BaseComponent from './base-component.js';

// noinspection JSUnusedGlobalSymbols
class Pagination extends BaseComponent {
    template = `
        <!--suppress CheckTagEmptyBody -->
        <div class="pagination">
            <ul class="pagination__panel">
                <li class="pagination__button" tabindex="0" data-first></li>
                <li class="pagination__dots" data-dots>...</li>
                <li class="pagination__button" tabindex="0" data-page></li>
                <li class="pagination__button" tabindex="0" data-page></li>
                <li class="pagination__button" tabindex="0" data-page></li>
                <li class="pagination__button" tabindex="0" data-page></li>
                <li class="pagination__button" tabindex="0" data-page></li>
                <li class="pagination__dots" data-dots>...</li>
                <li class="pagination__button" tabindex="0" data-last></li>
                <li class="pagination__button pagination__button_next" tabindex="0" data-next>
                    <i class="material-icons">arrow_forward</i>
                </li>
            </ul>

            <p class="pagination__label">
                <span data-range-start></span> – 
                <span data-range-end></span> из 
                <span data-quantity></span> вариантов аренды
            </p>
        </div>
    `;

    static getTag = () => 'pagination';
    static getType = () => 'Pagination';

    constructor() {
        super({ current: null, itemsOnPage: null, pageCount: null, totalItems: null });
    };

    click = function (event) {
        this.$state.actions.setCurrentPage(parseInt(event.target.textContent));
        this.update();
    }.bind(this);

    clickNext = function () {
        this.$state.actions.setCurrentPage(this.$state.getters.getCurrentPage() + 1);
        this.update();
    }.bind(this);

    _activate = function (classList, toggle) {
        if (toggle) {
            !classList.contains('pagination__button_active') && classList.add('pagination__button_active');
        } else {
            classList.contains('pagination__button_active') && classList.remove('pagination__button_active');
        }
    }.bind(this);

    _hide = function (classList, toggle) {
        if (toggle) {
            !classList.contains('hide') && classList.add('hide');
        } else {
            classList.contains('hide') && classList.remove('hide');
        }
    }.bind(this);

    _updateFirstButton = function (current, pageCount) {
        this._hide(this.$objects.dots[0].classList, pageCount < 8);
        if (current < 5) {
            this._hide(this.$objects.dots[0].classList, true);
            this._hide(this.$objects.pages[0].classList, false);
        } else if (pageCount > 7) {
            this._hide(this.$objects.dots[0].classList, false);
            this._hide(this.$objects.pages[0].classList, true);
        }

        this.$objects.first.textContent = 1;
        this._activate(this.$objects.first.classList, current === 1);
    }.bind(this);

    _updateLastButton = function (current, pageCount) {
        this._hide(this.$objects.dots[1].classList, pageCount < 8);
        if (current > pageCount - 4) {
            this._hide(this.$objects.dots[1].classList, true);
            this._hide(this.$objects.pages[this.$objects.pages.length-1].classList, false);
        } else if (pageCount > 7) {
            this._hide(this.$objects.dots[1].classList, false);
            this._hide(this.$objects.pages[this.$objects.pages.length-1].classList, true);
        }

        this.$objects.last.textContent = pageCount;
        this._activate(this.$objects.last.classList, current === pageCount);
    }.bind(this);

    _updatePageButtons = function (current, pageCount) {
        const pages = this.$objects.pages;

        pages.forEach((el, i) => {
            let numb = current < 5 ? i + 2 : current + i - 2;
            numb = current > pageCount - 4 ? (pageCount + i - 5) : numb;
            el.textContent = numb;

            this._hide(el.classList, numb <= 1 || numb >= pageCount);
            this._activate(el.classList, current === numb);
        });

        if (!pages[0].classList.contains('hide') && pageCount > 7) {
            this._hide(pages[0].classList, !this.$objects.dots[0].classList.contains('hide'));
        }
        if (!pages[1].classList.contains('hide') && pageCount > 7) {
            this._hide(pages[pages.length-1].classList, !this.$objects.dots[1].classList.contains('hide'));
        }
    }.bind(this);

    _updateNextButton = function (pageCount) {
        const toggle = pageCount === 1;

        this._hide(this.$objects.last.classList, toggle);
        this._hide(this.$objects.next.classList, toggle);
    }.bind(this);

    update = function () {
        let current = this.$state.getters.getCurrentPage();
        const itemsOnPage = this.$state.getters.getItemsOnPage();
        const pageCount = this.$state.getters.getPageCount();
        const totalItems = this.$state.getters.getTotalItems();

        if (!this.isStateChanged({ current, itemsOnPage, pageCount, totalItems })) return;
        if (current > pageCount) {
            this.$state.actions.setCurrentPage(pageCount);
        } else if (current < 1) {
            this.$state.actions.setCurrentPage(1);
        }

        current = this.$state.getters.getCurrentPage();
        this.cache = { current, itemsOnPage, pageCount, totalItems };

        this._updateLastButton(current, pageCount);
        this._updateFirstButton(current, pageCount);
        this._updatePageButtons(current, pageCount);
        this._updateNextButton(pageCount);

        this.$objects.start.textContent = itemsOnPage * (current - 1) + 1;
        this.$objects.end.textContent = Math.min(itemsOnPage * current, totalItems);
        this.$objects.quantity.textContent = totalItems;
    }.bind(this);

    render(app, node) {
        super.render(app, node);

        this.$objects = {
            dots: this.$el.querySelectorAll('li[data-dots]'),
            first: this.$el.querySelector('li[data-first]'),
            last: this.$el.querySelector('li[data-last]'),
            next: this.$el.querySelector('li[data-next]'),
            pages: this.$el.querySelectorAll('li[data-page]'),
            start: this.$el.querySelector('p span[data-range-start]'),
            end: this.$el.querySelector('p span[data-range-end]'),
            quantity: this.$el.querySelector('p span[data-quantity]'),
        };

        this.$objects.first.addEventListener('click', this.click);
        this.$objects.first.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.click(event);
        });

        this.$objects.last.addEventListener('click', this.click);
        this.$objects.last.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.click(event);
        });

        this.$objects.pages.forEach((el) => el.addEventListener('click', this.click));
        this.$objects.pages.forEach((el) => el.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.click(event);
        }));

        this.$objects.next.addEventListener('click', this.clickNext);
        this.$objects.next.addEventListener('keydown', (event) => {
            event.key === 'Enter' && this.clickNext();
        });

        this.update();
        clearInterval(this.interval);
        this.interval = setInterval(this.update, 100);
    };
}

export default Pagination;
