
module.exports = isDate;


/**
 * Matching format per: http://www.w3.org/TR/NOTE-datetime
 */

var isoformat = '^\\d{4}-\\d{2}-\\d{2}' +        // Match YYYY-MM-DD
                '((T\\d{2}:\\d{2}(:\\d{2})?)' +  // Match THH:mm:ss
                '(\\.\\d{1,6})?' +               // Match .sssss
                '(Z|(\\+|-)\\d{2}:\\d{2})?)?$';  // Time zone (Z or +hh:mm)


var matcher = new RegExp(isoformat);


function isDate (val) {
  return typeof val === 'string' &&
         matcher.test(val) &&
         !isNaN(Date.parse(val));
}