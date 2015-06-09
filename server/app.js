var fs = require("fs");
var express = require("express");
var neo4j = require('neo4j');

//graph
var graphdb = new neo4j.GraphDatabase("http://localhost:7474");

//website
var root = __dirname + '/../client';
var app = express.createServer();
app.use(express.static(root));
app.listen(8080);

console.log("Server listening on http://localhost:8080");

app.get('/route', requestHandler);

function requestHandler(request, response, next){
    var wid = request.query.wid || "BOSNST";
    var params = {wid: wid};
    var query = 'START a = node:stations(wid={wid}) '
        + 'MATCH p = a-[r:ROUTE_TO*0..2]->b '
        + 'WHERE a <> b '
        + 'RETURN nodes(p) as data';

    graphdb.query(query, params, queryHandler);

    function queryHandler(err, result){
        console.log(err, result.length);
        result = result.slice(0,100);
        var a = [];
        for(var i=-1;++i<result.length;){
            var item = result[i];
            var iArr = item.data.map(function(x){return x.data;});
            a.push(iArr);
        };
        response.json(a);
    };

}
