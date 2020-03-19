const got = require('got');
const FormData = require('form-data');

const MOCKY_URL = 'https://mocky.io/';

module.exports = (content) => {
    const formData = new FormData();
    formData.append('statuscode', 201);
    formData.append('contenttype', 'application/xml');
    formData.append('charset', 'UTF-8');
    formData.append('body', content);

    return got.post(MOCKY_URL, {
        body: formData,
        headers: formData.getHeaders(),
        resolveBodyOnly: true
    });
};
