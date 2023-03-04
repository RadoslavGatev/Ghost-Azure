/**
 * Promise Pool
 *
 * The pool will execute all the tasks with maxConcurrent tasks
 * running simoultaneously at most.
 */

async function pool(tasks, maxConcurrent) {
    if (maxConcurrent < 1) {
        throw new Error('Must set at least 1 concurrent workers'); // eslint-disable-line no-restricted-syntax
    }

    const taskIterator = tasks.entries();
    const results = [];

    const workers = Array(maxConcurrent).fill(taskIterator).map(
        async (workerIterator) => {
            for (let [index, task] of workerIterator) {
                results[index] = await task();
            }
        }
    );
    await Promise.all(workers);
    return results;
}

module.exports = pool;
