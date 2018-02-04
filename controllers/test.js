module.exports = function(app) {

    app.get('/api/test', function(req, res) {
        res.json({hello: "world"});
    });

};