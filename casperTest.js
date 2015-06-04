


casper.test.begin('beacon test' ,function suite(test){
    casper.start('http://localhost:3000/' ,function(){
        casper.on('resource.requested', function(req,resource) {
            var query = parseQuery(req.url);
            test.assertEquals(query['m'],"18");
        });
        this.mouse.down("#innerContainer");
    });
    casper.run(function() {
        test.done();
    });
});

function parseQuery(qstr)
{
    var query = {};
    var a = qstr.split('?')[2];
    a = a.split('&');

    for (var i in a)
    {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
    }

    return query;
}