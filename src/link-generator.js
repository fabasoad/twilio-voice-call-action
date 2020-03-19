process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const got = require('got');
const FormData = require('form-data');

const MOCKY_URL = 'https://mocky.io/';

module.exports = (content, callback) => {
    const formData = new FormData();
    formData.append('statuscode', 201);
    formData.append('contenttype', 'application/xml');
    formData.append('charset', 'UTF-8');
    formData.append('body', content);

    const headers = formData.getHeaders();
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    got.post(MOCKY_URL, {
        body: formData,
        headers: headers,
        resolveBodyOnly: true,
        form: true
    }).then(({ url }) => {
        console.log('MOCKY RESP: ', url);
        callback(url);
    }).catch(err => {
        console.log('ERROR: ', err);
    });
};