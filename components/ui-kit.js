template = `
    <h1>This one is the sub-section or widget title</h1><br>
    <h2>Next one is the item title inside widgets</h2><br>
    <h3>This is a label or CTA text</h3><br>
    This is the body text which is used for most of the design, like paragraphs, lists, etc.<br><br>
    <div class="block">
        <label class="block__label">Text Field</label>
        <input type="text" placeholder="Email"/>
    </div><br>
    <div class="block">
        <label class="block__label">Dropdown</label>
        <div class="cm-select"></div>
    </div><br>
    <div class="block">
        <label class="block__label">Buttons</label>
        <div class="block__row">
            <button class="button_purple">Click me</button>
            <button class="button_purple" style="margin-left: 1rem" disabled>Click me</button>
        </div>
        <div class="block__row">
            <button class="button_white">Click me</button>
            <button class="button_white" style="margin-left: 1rem" disabled>Click me</button>
        </div>
        <div class="block__row">
            <a href="#">Click me</a>
            <a href="#" style="margin-left: 1rem" disabled>Click me</a>
        </div>
        <div class="block__row">
            <button class="button_purple button_lg">
                Go to<span class="i-arrow-right button__icon"></span>
            </button>
        </div>
    </div><br>
    <div class="block">
        <label class="block__label">Pagination</label>
        <div class="pagination"></div>
    </div><br>
    
    <div class="block">
        <checkbox-list ref="demoCheckboxList"></checkbox-list>
    </div>
    
    <div class="block">
        <radio-group ref="demoRadioGroup"></radio-group>
    </div>
    
    <div class="block">
        <label class="block__label">Toggle</label>
        <toggle ref="demoToggle"></toggle>
    </div>
    
    <div class="block">
        <label class="block__label">Like button</label>
        <like-button ref="demoLikeButton"></like-button>
    </div>
    
    <div class="block">
        <bullet-list ref="demoBulletList"></bullet-list>
    </div>
`;

el = document.querySelector('.demo');

if (el) {
    el.insertAdjacentHTML('afterbegin', template);
}

el = document.querySelector('button .i-arrow-right');

if (el) {
    el.insertAdjacentHTML('afterbegin', arrowRight);
}
