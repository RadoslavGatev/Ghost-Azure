/**
 * This is a feature request in knex for 1.0.
 * https://github.com/tgriesser/knex/issues/1641
 */
module.exports = function (bookshelf) {
    const originalTransaction = bookshelf.transaction;

    bookshelf.transaction = function (cb) {
        return originalTransaction.bind(bookshelf)(function (t) {
            const originalCommit = t.commit;
            const originalRollback = t.rollback;

            t.commit = async function () {
                const originalReturn = await originalCommit.apply(t, arguments);
                t.emit('committed', true);
                return originalReturn;
            };

            t.rollback = async function () {
                const originalReturn = await originalRollback.apply(t, arguments);
                t.emit('committed', false);
                return originalReturn;
            };

            return cb(t);
        });
    };
};
