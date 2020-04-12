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

//empty page and fill new images with ajax/json pages
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

//filter by keyword
//hide mustache template / event.target is select .value is option /
function clickHandler(event) {
    $('.photo-article').hide();
    let id = `.${event.target.value}`;
    $(id).show();
}
//change AFTER different option is selected from dropdown
$('select').on('change', clickHandler);

//pull from json / images
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


//sort alphabetically
const sortTitle = () => {
    gallery.sort( (a,b) => {
        let aTitle = a.title;
        let bTitle = b.title;
        if (aTitle < bTitle){
            return -1;
        }else if(aTitle > bTitle){
            return 1;
        }else{
            return 0;
        }
    });
};

//sort by title on click
function titleClick(event){
    event.preventDefault();
    $('main').empty();
    sortTitle();
    gallery.forEach( (value) => {
        addValuesToBody(value);
    });
    console.log('title click');
}
$('#sortTitle').on('click', titleClick);

//sort by number of horn
const sortHorn = () => {
    gallery.sort( (a,b) => {
        let aHorn = a.horns;
        let bHorn = b.horns;
        if( aHorn < bHorn){
            return -1;
        }else if(aHorn > bHorn){
            return 1;
        }else{
            return 0;
        }
    });
};

function hornClick(event){
    event.preventDefault();
    $('main').empty();
    sortHorn();
    gallery.forEach( (value) => {
        addValuesToBody(value);
    });
    console.log('horn click');
}
$('#sortHorn').on('click', hornClick);
