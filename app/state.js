'use strict';

// noinspection JSUnusedGlobalSymbols
class State {
    data = {
        login: false,
        page: {
            current: 1,
            items: 12,
            totalItems: 12 * 15,
        },
        view: -1,
    };

    mutations = {
        SET_LOGIN: function (login) {
            this.data.login = login;
        }.bind(this),

        SET_CURRENT_PAGE: function (currentPage) {
            this.data.page.current = currentPage;
        }.bind(this),

        SET_TOTAL_ITEMS: function (totalItems) {
            this.data.page.totalItems = totalItems;
        }.bind(this),

        SET_VIEW: function (view) {
            this.data.view = view;
        }.bind(this),
    };

    actions = {
        setLogin: function () {
            this.mutations.SET_LOGIN(true);
        }.bind(this),

        setLogout: function () {
            this.mutations.SET_LOGIN(false);
        }.bind(this),

        /** @param currentPage number */
        setCurrentPage: function (currentPage) {
            const pageCount = this.getters.getPageCount();
            currentPage = currentPage > 0 ? currentPage : 1;
            this.mutations.SET_CURRENT_PAGE(currentPage <= pageCount ? currentPage : pageCount);
        }.bind(this),

        /** @param totalItems number */
        setTotalItems: function (totalItems) {
            this.mutations.SET_TOTAL_ITEMS(totalItems > 0 ? totalItems : 0);
        }.bind(this),

        /** @param view number */
        setView: function (view) {
            this.mutations.SET_VIEW(view);
        }.bind(this),
    };

    getters = {
        getLogin: function () {
            return this.data.login;
        }.bind(this),

        getCurrentPage: function () {
            return this.data.page.current;
        }.bind(this),

        getItemsOnPage: function () {
            return this.data.page.items;
        }.bind(this),

        getPageCount : function () {
            return Math.ceil(this.data.page.totalItems / this.data.page.items);
        }.bind(this),

        getTotalItems: function () {
            return this.data.page.totalItems;
        }.bind(this),

        getView: function () {
            return this.data.view;
        }.bind(this),
    };
}

export default State;
