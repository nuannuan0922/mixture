var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    var url = request.url;
    var content_type = 'text/html';
    // if (url.endsWith('.html')) {
    //     content_type = '';
    // }
    // else 
    if (url.endsWith('.js')) {
        content_type = 'text/javascript';
    }
    else if (url.endsWith('.css')) {
        content_type = 'text/css';
    }
    else if (url.endsWith('.icon')) {
        content_type = 'image/x-icon';
    }
    else if (url.endsWith('.png')) {
        content_type = 'image/jpeg';
    }

    let filename = url.slice(1) || 'index.html'
    let pathname = path.resolve(__dirname + '/../src/' + filename);
    console.log(pathname);

    /**
     * 根据修改时间缓存
     */
    // let statsObj = fs.statSync(pathname); // 返回一个stats类型的对象
    // let lastModifiedMs = statsObj.mtime.toGMTString();
    // response.setHeader('Cache-Control', 'no-cache');
    // response.setHeader('Last-Modified', lastModifiedMs);
    // if (request.headers['if-modified-since'] === lastModifiedMs) {
    //     response.statusCode = 304;
    //     response.end();
    //     return;
    // }

    fs.readFile(pathname, function (err, data) {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            response.write(err);
            response.end();
        } else {
            /**
             * 强制缓存. 有其中一句即可以缓存
             */
            // response.setHeader('Cache-Control','max-age=10');
            // response.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString());

            
            response.writeHead(200, {'Content-Type': content_type + '; charset=utf-8'});
            response.write(data);
            response.end();
        }
    })
}).listen(8000);