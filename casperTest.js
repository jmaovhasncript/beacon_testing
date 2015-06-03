var casper = require('casper').create({
//    onResourceReceived: resRecv
});
var mouse = require("mouse").create(casper);

casper.start('http://localhost:3000/', function() {
    casper.on('resource.requested', function(req,resource) {
        console.log(resource);
        this.echo(JSON.stringify(req, null, 4));
    });
    casper.on('resource.received', function(resource) {
        this.echo(JSON.stringify(resource, null, 4));
    });

    this.mouse.down("#innerContainer");

    casper.thenEvaluate(function(){
        var element = document.querySelector('#hello')
        __utils__.echo(element.id);
    });


});
debugger;







//casper.thenEvaluate(function() {
//    var element = document.querySelector('#start')
//    __utils__.echo(element.id);
//});

casper.run();