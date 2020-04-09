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

// ImageGallery.prototype.render = function(){
//     $('#body').append(`
//         <h2>${this.title}</h2>
//         <img src=${this.image_url} alt=${this.keyword}>
//         <p>${this.description}</p>
//         <p>${this.keyword}</p>
//         <p>${this.horns}</p>
//         `);
// };

// const addValuesToBody = (item) => {
//     $('#photo-template').append(`
//     <article class='photo-article ${item.keyword}'>
//     <h2>${item.title}</h2>
//     <img src=${item.image_url}>
//      <p>${item.description}</p>
//      <p>${item.keyword}</p>
//      <p>${item.horns}</p>
//     </article>
//     `);
// };

//mustache template
const addValuesToBody = (item) => {
    let $template = $('#photo-template').html();
    let $target = $('#main');

    $target.append(Mustache.render($template, item));
};

//renderers all images in drop down
const addValuesToDropdown = () => {
    gallery.forEach( (option) => {
        console.log('bing bong');
        $('select').append(`
        <option value ='${option.keyword}'>${option.keyword}</option>
        `);
    });
};

const pageOneGallery = (event) => {
    $('section').empty();
    $('select').empty();
    event.preventDefault();
    defaultValue = 'page-1';
    callAjax(defaultValue);
};
$('#page-1').on('click', pageOneGallery);

const pageTwoGallery = (event) => {
    $('section').empty();
    $('select').empty();
    event.preventDefault();
    defaultValue = 'page-2';
    callAjax();
};
$('#page-2').on('click', pageTwoGallery);

function callAjax(){
    $.ajax(`data/${defaultValue}.json`).then(data => {
        let gallery = [];
        data.forEach( (value) => {
            let newThing = new ImageGallery(value.image_url, value.title, value.description, value.keyword, value.horns);
            gallery.push(newThing);
        });
        gallery.forEach( value => {
            gallery.push(value);
            addValuesToBody(value);
        });
        addValuesToDropdown();
    });
    console.log('help');
}
callAjax(defaultValue);

function clickHandler(event) {
    $('.photo-article').hide();
    let id = `.${event.target.value}`;
    $(id).show();
    console.log(event);
}

$('select').on('change', clickHandler);

// $('#page-1').on('click', () => {callAjax()});
// $('#page-2').on('click', () => {callAjax()});
