'use strict';

function ImageGallary(image_url, title, description, keyword, horns){
  this.image_url = image_url; 
  this.title = title;
  this.description = description;
  this.keyword = keyword; 
  this.horns = horns;
}

ImageGallary.prototype.render = () => {
  $('#body').append(`
    <h2>${this.title}</h2>
    <img src=${this.image_url} alt=${this.keyword}>
    <p>${this.description}</p>
    <p>${this.keyword}</p>
    <p>${this.horns}</p>
    `);
};

console.log($.ajax('../data/page-1.json'));

const AddValuesToBody = (item) => {
  $('#body').append(`
    <h2>${item.title}</h2>
    <img src=${item.image_url}>
    <p>${item.description}</p>
    <p>${item.keyword}</p>
    <p>${item.horns}</p>
    `);
};

$.ajax('../data/page-1.json').then(data => {
    data.forEach(AddValuesToBody);
});