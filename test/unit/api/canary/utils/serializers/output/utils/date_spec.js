const should = require('should');
const sinon = require('sinon');
const settingsCache = require('../../../../../../../../core/server/services/settings/cache');
const dateUtil = require('../../../../../../../../core/server/api/canary/utils/serializers/output/utils/date');

describe('Unit: canary/utils/serializers/output/utils/date', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('creates date strings in ISO 8601 format with UTC offset', function () {
        const timezone = 'Europe/Oslo';
        const testDates = [
            {in: '2014-01-01T01:28:58.593Z', out: '2014-01-01T02:28:58.593+01:00'},
            {in: '2014-12-31T23:28:58.123Z', out: '2015-01-01T00:28:58.123+01:00'},
            {in: '2014-03-01T01:28:58.593Z', out: '2014-03-01T02:28:58.593+01:00'}
        ];
        sinon.stub(settingsCache, 'get').returns(timezone);

        testDates.forEach((date) => {
            dateUtil.format(date.in).should.equal(date.out);
        });
    });
});
