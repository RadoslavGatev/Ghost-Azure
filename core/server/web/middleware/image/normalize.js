const _ = require('lodash');
const path = require('path');
const config = require('../../../config');
const common = require('../../../lib/common');
const image = require('../../../lib/image');

module.exports = function normalize(req, res, next) {
    const imageOptimizationOptions = config.get('imageOptimization');

    if (!imageOptimizationOptions.resize) {
        return next();
    }

    const out = `${req.file.path}_processed`;
    const originalPath = req.file.path;

    const options = Object.assign({
        in: originalPath,
        out,
        ext: req.file.ext,
        width: 2000
    }, imageOptimizationOptions);

    image.manipulator.process(options)
        .then(() => {
            req.files = [];

            // CASE: push the processed/optimised image
            req.files.push(Object.assign(req.file, {path: out}));

            // CASE: push original image, we keep a copy of it
            const parsedFileName = path.parse(req.file.name);
            const newName = `${parsedFileName.name}_o${parsedFileName.ext}`;
            req.files.push(Object.assign(_.cloneDeep(req.file), {path: originalPath, name: newName}));

            next();
        })
        .catch((err) => {
            err.context = `${req.file.name} / ${req.file.type}`;
            common.logging.error(err);
            next();
        });
};
