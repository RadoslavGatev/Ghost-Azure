/**
 * @callback Task
 * @param {...any} args
 * @returns {Promise}
 */

/**
 * Executes a series of asyncronous tasks in sequence
 * @param {Task[]} tasks Set of tasks to complete in sequence
 * @param {...any} args Arguments for the task
 * @returns {Promise<any[]>} Set of results for each task, in same order as input
 */
async function sequence(tasks, ...args) {
    const results = [];
    for (const task of tasks) {
        results.push(await task.apply(this, args));
    }
    return results;
}

module.exports = sequence;
