var casper = require('casper').create({
});
var mouse = require("mouse").create(casper);

casper.start('http://localhost:3000/', function() {
    this.mouse.down("#innerContainer");
//    this.mouse.down(50, 50);
    casper.on('step.error complete.error', function(error) {
        this.log('alert called');
        throw error;
    });
    casper.thenEvaluate(function(){
        __utils__.echo('start');

        __utils__.echo('middle');

        var element = document.querySelector('#hello')
        __utils__.echo(element.id);
    });

});



//casper.thenEvaluate(function() {
//    var element = document.querySelector('#start')
//    __utils__.echo(element.id);
//});

casper.run();