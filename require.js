let fs = require('fs');
let systemPath = require('path');

class Require {
    recursive(folder, app, ext = '.js', action = (newPath => require(newPath))) {
        let include = path => {
            fs.readdirSync(path).forEach( file => {
                const newPath = path + '/' + file;
                const stat = fs.statSync(newPath);
                if (stat.isFile()) {
                    const extension = systemPath.extname(file);
                    if(extension === ext) {
                        app.use(file, action(newPath));
                        console.log("added route " + file)
                    }
                } else {
                    include(newPath);
				}
            });
        };
        include(process.cwd() + "/" + folder);
    }
}

module.exports = new Require();
