import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const indexTemplate = require("./index.handlebars");

$(function() {
    let _indexTemplate = indexTemplate({
		username: "test",
		info: "Your books are due next Tuesday",
    });

    $('body').append(_indexTemplate);
    
})