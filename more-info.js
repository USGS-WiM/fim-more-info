const fs = require('fs');
const http = require('http');
var url = require('url');

const hostname = '127.0.0.1';
const port = 3002;

const server = http.createServer((req, res) => {
    var siteno = url.parse(req.url, true).query['siteno'];

    //USGSID|STUDY_AREA|PURPOSE_SCOPE|TITLE|PUB_DATE|URL|HYDRO_STEADY|MODEL_CALIB|WATER_PROFILE|PROD_ACC|REP_SER_NUM
    var USGSID;
    var ADD_INFO;

    var hassite = false;

    if (siteno !== undefined) {
        fs.readFile('data/query.txt', 'utf8', function(err, data) {
            //if (err) throw err;
            var sites = data.split("\r\n");
            for (i = 0; i < sites.length; i++) {
                var site = sites[i].split("|");
                /*console.log("site[0]", site[0].trimEnd());
                console.log("site[0] length", site[0].trimEnd().length)
                console.log("siteno", siteno);
                console.log("siteno length", siteno.length);
                console.log("match", site[0].trimEnd() == siteno);*/
                if (site[0].trimEnd() == siteno) {
                    USGSID = site[0];
                    ADD_INFO = site[1];
                    hassite = true;
                    break;
                }
            }
            
            if (hassite == true) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(JSON.stringify({ "hassite" : true , 
                                            "USGSID" : USGSID,
                                            "ADD_INFO" : ADD_INFO              
                                        }));
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(JSON.stringify({ "hassite" : false }));
            }
        });
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ "hassite" : false }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});