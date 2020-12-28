import './jquery.js';
import './jquery-ui.js';
import './jquery-datepicker-extended-range.js';

$.datepicker.regional['ru'] = {
    prevText: 'Пред',
    nextText: 'След',
    currentText: 'Сегодня',
    closeText: 'Применить',
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'],
    dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    dayNamesShort: ['Вск','Пнд','Втр','Срд','Чтв','Птн','Сбт'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    weekHeader: 'Не',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['ru']);
