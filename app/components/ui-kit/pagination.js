template = `
    <ul class="pagination__pages">
        <li class="pagination__page pagination__page_prev"><span class="i-arrow-left pagination__icon"></span></li>
        <li class="pagination__page">1</li>
        <li class="pagination__page pagination__page_active">2</li>
        <li class="pagination__page">3</li>
        <li class="pagination__page">...</li>
        <li class="pagination__page">8</li>
        <li class="pagination__page">..</li>
        <li class="pagination__page">14</li>
        <li class="pagination__page">15</li>
        <li class="pagination__page pagination__page_next"><span class="i-arrow-right pagination__icon"></span></li>
    </ul>
    <p class="pagination__label">1 – 12 из 100+ вариантов аренды</p>
`;

el = document.querySelector('.pagination');

if (el) {
    el.insertAdjacentHTML('afterbegin', template);
}

el = document.querySelector('.pagination__pages .i-arrow-left');

if (el) {
    el.insertAdjacentHTML('afterbegin', arrowLeft);
}

el = document.querySelector('.pagination__pages .i-arrow-right');

if (el) {
    el.insertAdjacentHTML('afterbegin', arrowRight);
}
