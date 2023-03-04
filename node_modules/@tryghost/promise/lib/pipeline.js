/**
 * @callback Task
 * @param {...any} args
 * @returns {Promise}
 */

/**
 * Execute a series of async functions, passing the results of each to the next
 * @param {Task[]} tasks Set of tasks to complete in sequence
 * @param {...any} args Arguments for the first task, can be promises which will be resolved
 * @returns {Promise}
 */
async function pipeline(tasks, ...args) {
    let results = await Promise.all(args);
    for (const task of tasks) {
        results = await task.apply(null, Array.isArray(results) ? results : [results]);
    }
    return results;
}

module.exports = pipeline;
