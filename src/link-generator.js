const got = require('got');
const FormData = require('form-data');

const MOCKY_URL = 'https://mocky.io/';

module.exports = async (content) => {
    const formData = new FormData();
    formData.append('statuscode', 201);
    formData.append('contenttype', 'application/xml');
    formData.append('charset', 'UTF-8');
    formData.append('body', content);

    const headers = formData.getHeaders();
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    return got.post(MOCKY_URL, {
        // body: formData,
        headers: headers,
        resolveBodyOnly: true,
        form: formData
    });
};