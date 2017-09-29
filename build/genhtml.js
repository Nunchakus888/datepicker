const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Glob = require('./lib/glob');

// entries
const ENTRY_DIR = Path.join(__dirname, '..', 'src/pages');

module.exports = () => {
    const entries = Glob.sync('**/*.js', {
        cwd: ENTRY_DIR,
        nodir: true
    });

    let pluginList = [];
    entries.forEach(entry => {
        const FILE_NAME = entry.split('.')[0];
        const OUTPUT_PATH = Path.join(__dirname, '..', 'html');

        pluginList.push(new HtmlWebpackPlugin({
            title: 'app-distribution-h5',
            inject: true,
            cache: true,
            template: 'template/index.ejs',
            filename: Path.join(OUTPUT_PATH, FILE_NAME + '.html'),
            chunks: ['manifest', 'common', FILE_NAME]
        }))
    });

    return pluginList;
}


