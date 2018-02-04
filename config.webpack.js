// TODO get rid of grunt and switch to webpack
// work in progress
const path = require('path');

module.exports = {
    entry:{ vendor: ['.public/js/app.debug.js', '.public/js/app.debug.js'] },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js')
    }
};