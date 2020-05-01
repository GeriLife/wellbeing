const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

jsdoc2md.render({ files: './server/**/*.js' }).then(function (data) {
  fs.writeFileSync('docs.md', data, { encoding: 'utf8' });
});
