var KnexMigrator = require('knex-migrator');
var knexMigrator = new KnexMigrator({
    knexMigratorFilePath: __dirname
});

knexMigrator.init();
// knexMigrator.migrate();