import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import validate from 'jquery-validation'

const indexTemplate = require("./index.handlebars");

$(function() {
    let _indexTemplate = indexTemplate({
		username: "test",
		info: "Your books are due next Tuesday",
    });

    $('body').append(_indexTemplate);


    $("#form").validate({
        rules: {
            "name": {
                required: true,
                minlength: 5
            },
            "email": {
                required: true,
                email: true
            }
        },
        messages: {
            "name": {
                required: "Please, enter a name"
            },
            "email": {
                required: "Please, enter an email",
                email: "Email is invalid"
            }
        },
        submitHandler: function (form) { // for demo
            alert('valid form submitted'); // for demo
            return false; // for demo
        }
    });
    
})