const got = require('got');

const MOCKY_URL = 'https://www.mocky.io/';

module.exports = (body, callback) => {
    const form = new FormData();
    form.append('statuscode', 201);
    form.append('contenttype', 'application/xml');
    form.append('charset', 'UTF-8');
    form.append('body', body);
  
    const headers = form.getHeaders();
    headers['Content-Type'] = 'application/x-www-form-urlencoded';

    got.post(MOCKY_URL, {
        body: form,
        headers: headers
    }).then(({ body }) => {
        console.log('MOCKY RESP: ', body);
        callback(JSON.parse(body).url);
    }).catch(err => {
        console.log('ERROR: ', err);
    });
};