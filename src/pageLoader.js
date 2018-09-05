
const indexTemplate = require("./index.handlebars");

class PageLoader{
   constructor(){
    {
       this.data = {addressInputs: [{
            label: 'Street Number',
            id: 'streetnumber'
        }, {
            label: 'Route',
            id: 'route'
        }, {
            label: 'Locality',
            id: 'locality'
        }, {
            label: 'State',
            id: 'state'
        }, {
            label: 'County',
            id: 'county'
        }, {
            label: 'Township',
            id: 'township'
        }, {
            label: 'Zip Code',
            id: 'zip'
        }, {
            label: 'Country',
            id: 'country'
        }]
     }
     this.init();
    }  

   

   } 
   init() {
    const _indexTemplate = indexTemplate(this.data);
    $('body').append(_indexTemplate);
}

   
}
module.exports = PageLoader;