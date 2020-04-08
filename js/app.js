'use strict';

let gallery = [];

function ImageGallery(image_url, title, description, keyword, horns){
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    gallery.push(this);
}

// ImageGallery.prototype.render = () => {
//   $('#body').append(`
//     <h2>${this.title}</h2>
//     <img src=${this.image_url} alt=${this.keyword}>
//     <p>${this.description}</p>
//     <p>${this.keyword}</p>
//     <p>${this.horns}</p>
//     `);
// };

$('select').on('click', function(event) {
    // $('#photoTemplate').hide();
    console.log(event);
});

console.log($.ajax('data/page-1.json'));

const addValuesToBody = (item) => {
    $('#main').append(`
        <article id='#photoTemplate>
            <h2>${item.title}</h2>
            <img src=${item.image_url}>
            <p>${item.description}</p>
            <p>${item.keyword}</p>
            <p>${item.horns}</p>
        </article>
        `);
};

const addValuesToDropdown = (option) => {
    $('select').append(`
    <option value ='${option.keyword}'>${option.keyword}</option>
    `);
};

$.ajax('data/page-1.json').then(data => {
    data.forEach( (value) => {
        new ImageGallery(value.image_url. value.title, value.description, value.keyword, value.horns);
    });
    gallery.forEach( value => {
        addValuesToBody(value);
        addValuesToDropdown(value);
    });
});

console.log(gallery);


