const http = require('https');

const options = {
  method: 'POST',
  hostname: 'api.ditchcarbon.com',
  port: null,
  path: '/organizations',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ currency: 'USD' }));
req.end();
