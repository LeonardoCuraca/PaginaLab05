var http = require('http');
const { parse } = require('querystring');
fs = require('fs');

http.createServer(function(req, res) {
  if (req.method === 'POST') {
    collectRequestData(req, result => {
      console.log("hi");
      console.log(result);
      res.end(`
        <h1>Muy pronto nos pondremos en contacto ${result.firstName} ${result.lastName}</h1>
        <p>E-mail: ${result.email}</p>
        <p>Telefono Movil: ${result.movil}</p>
        <p>Fecha de Nacimiento: ${result.birthday}</p>
        <p>Mensaje: ${result.message}</p>
      `);
    });
  } else {
    var url = req.url;
    if (url === '/') {
      fs.readFile('./index.html', function(error, html) {
        res.write(html);
        res.end();
      })
    } else if (url === '/nosotros') {
      fs.readFile('./nosotros.html', function(error, html) {
        res.write(html);
        res.end();
      })
    } else if (url === '/servicios') {
      fs.readFile('./servicios.html', function(error, html) {
        res.write(html);
        res.end();
      })
    } else if (url === '/contacto') {
      fs.readFile('./contacto.html', function(error, html) {
        res.write(html);
        res.end();
      })
    } else {
      res.end('<h1>Error 404 Page not Found</h1>')
    }
  }
}).listen(process.env.PORT || 3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
