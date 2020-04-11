'use strict';

let gallery = [];
let defaultValue = 'page-1';

function ImageGallery(image_url, title, description, keyword, horns){
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    gallery.push(this);
}
console.log(gallery);

//mustache template
const addValuesToBody = (item) => {
    let template = $('#photo-template').html();
    let renderedTemplate = Mustache.render(template, item);

    $('#main').append(renderedTemplate);
};

//renderers all images in drop down
const addValuesToDropdown = () => {
    gallery.forEach( (option) => {
        $('#workpls').append(`
        <option value ='${option.keyword}'>${option.keyword}</option>
        `);
    });
};

//empty previous page and fill new images with ajax/json
const pageOneGallery = (event) => {
    $('#main').empty();
    $('#workpls').empty();
    event.preventDefault();
    defaultValue = 'page-1';
    callAjax(defaultValue);
};
$('#page-1').on('click', pageOneGallery);

const pageTwoGallery = (event) => {
    $('#main').empty();
    $('#workpls').empty();
    event.preventDefault();
    defaultValue = 'page-2';
    callAjax(defaultValue);
};
$('#page-2').on('click', pageTwoGallery);

//pull from json
function callAjax(defaultValue){
    $.ajax(`data/${defaultValue}.json`).then(data => {
        gallery = [];
        data.forEach( (value) => {
            let newThing = new ImageGallery(value.image_url, value.title, value.description, value.keyword, value.horns);
        });
        gallery.forEach( value => {
            addValuesToBody(value);
        });
        addValuesToDropdown();
    });
}
callAjax(defaultValue);

function clickHandler(event) {
    $('.photo-article').hide();
    let id = `.${event.target.value}`;
    $(id).show();
    console.log(event);
    console.log('click');
}

$('select').on('change', clickHandler);

// $('#page-1').on('click', () => {callAjax()});
// $('#page-2').on('click', () => {callAjax()});
