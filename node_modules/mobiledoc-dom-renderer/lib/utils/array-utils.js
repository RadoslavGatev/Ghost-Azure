export function includes(array, detectValue) {
  for (let i=0;i < array.length;i++) {
    let value = array[i];
    if (value === detectValue) {
      return true;
    }
  }
  return false;
}


/**
 * @param {Array} array of key1,value1,key2,value2,...
 * @return {Object} {key1:value1, key2:value2, ...}
 * @private
 */
export function kvArrayToObject(array) {
  if (!Array.isArray(array)) { return {}; }

  const obj = {};
  for (let i = 0; i < array.length; i+=2) {
    let [key, value] = [array[i], array[i+1]];
    obj[key] = value;
  }
  return obj;
}

/**
 * @param {Object} {key1:value1, key2:value2, ...}
 * @return {Array} array of key1,value1,key2,value2,...
 * @private
 */
export function objectToSortedKVArray(obj) {
  const keys = Object.keys(obj).sort();
  const result = [];
  keys.forEach(k => {
    result.push(k);
    result.push(obj[k]);
  });
  return result;
}
