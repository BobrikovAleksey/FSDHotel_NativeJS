template = `
    <input class="cm-select__input" type="button" value="Lorem ipsum dolor" onblur="" onclick="" />
    <ul class="cm-select__list">
        <li class="cm-select__item" onmouseover="" onmouseout="" onclick=""><h3>Lorem ipsum dolor</h3></li>
        <li class="cm-select__item" onmouseover="" onmouseout="" onclick=""><h3>Lorem ipsum dolor</h3></li>
        <li class="cm-select__item" onmouseover="" onmouseout="" onclick=""><h3>Lorem ipsum dolor</h3></li>
    </ul>
    <span class="cm-select__icon">
        <i class="fa fa-angle-down"></i>
    </span>
`;

el = document.querySelector('.cm-select');

if (el) {
    el.insertAdjacentHTML('afterbegin', template);
}