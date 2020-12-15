'use strict';

const template = `
    <div class="ui__container">
        <h1>This one is the sub-section or widget title</h1><br>
    
        <h2>Next one is the item title inside widgets</h2><br>
    
        <h3>This is a label or CTA text</h3><br>
    
        This is the body text which is used for most of the design, like paragraphs, lists, etc.<br><br>
    
        <div class="ui__block">
            <label class="ui__label">Text Field</label>
            <input type="text" placeholder="Email"/>
        </div><br>
    
        <div class="ui__block">
            <label class="ui__label">Buttons</label>
    
            <div class="ui__row">
                <button class="button">Click me</button>
                <button class="button" style="margin-left: 1rem" disabled>Click me</button>
            </div>
            
            <div class="ui__row">
                <button class="button button_white">Click me</button>
                <button class="button button_white" style="margin-left: 1rem" disabled>Click me</button>
            </div>
    
            <div class="ui__row">
                <button>Click me</a>
                <button style="margin-left: 1rem" disabled>Click me</a>
            </div>

            <div class="ui__block">
                <cm-select-expanded ref="demoCmSelectExpended" />
            </div><br>
    
            <div class="ui__row">
                <button class="button button_lg">Go to<i class="material-icons">arrow_forward</i></button>
            </div>
        </div><br>
    </div>

<!--    <div class="ui-block">-->
<!--        <label class="ui-block__label">Pagination</label>-->
<!--        <div class="pagination"></div>-->
<!--    </div><br>-->

<!--    <div class="ui-block">-->
<!--        <cm-select ref="demoCmSelect"></cm-select>-->
<!--    </div><br>-->

<!--    <div class="ui-block">-->
<!--        <checkbox-list ref="demoCheckboxList"></checkbox-list>-->
<!--    </div><br>-->
    
<!--    <div class="ui-block">-->
<!--        <radio-group ref="demoRadioGroup"></radio-group>-->
<!--    </div><br>-->
    
<!--    <div class="ui-block">-->
<!--        <label class="ui-block__label">Toggle</label>-->
<!--        <toggle ref="demoToggle"></toggle>-->
<!--    </div><br>-->
    
<!--    <div class="ui-block">-->
<!--        <label class="ui-block__label">Like button</label>-->
<!--        <like-button ref="demoLikeButton"></like-button>-->
<!--    </div><br>-->
    
<!--    <div class="ui-block">-->
<!--        <bullet-list ref="demoBulletList"></bullet-list>-->
<!--    </div><br>-->
`;

export default template;
