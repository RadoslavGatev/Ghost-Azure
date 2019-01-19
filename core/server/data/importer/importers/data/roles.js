const debug = require('ghost-ignition').debug('importer:roles'),
    BaseImporter = require('./base');

class RolesImporter extends BaseImporter {
    constructor(allDataFromFile) {
        super(allDataFromFile, {
            modelName: 'Role',
            dataKeyToImport: 'roles'
        });

        this.errorConfig.returnDuplicates = false;
    }

    beforeImport() {
        debug('beforeImport');
        return super.beforeImport();
    }

    doImport(options, importOptions) {
        return super.doImport(options, importOptions);
    }
}

module.exports = RolesImporter;
