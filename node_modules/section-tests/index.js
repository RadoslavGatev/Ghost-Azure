#!/usr/bin/env node
{
    'use strict';

    const Section = require('./src/Section');
    const SpecReporter = require('./src/SpecReporter');


    // expose the section interface
    module.exports = new Section().getInterface();
    module.exports.SpecReporter = SpecReporter;
}