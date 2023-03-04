# Section Tests - TDD for node

A beautiful, extensible and lightweight async test framework.


![](https://github.com/distributed-systems/section-tests/raw/master/doc/screenshot.png)


## Usage

**1. Install the module**

     npm i --save-dev section-tests

**2. Add test command to your package.json file**

    "scripts": {
        "test": "./node_modules/.bin/section ./test/**/*.js"
    },

You may use [glob](https://www.npmjs.com/package/glob) patterns for defining the files 
that should be loaded for executing the tests.


**3. Create your test files**

The section test framework generates structured messages from your test which then
are processed by an output reporter. That reporter needs to be instantiated before the
first test is executed.

Example:

    import section, {SpecReporter} from 'section-tests';


    // this must only be done in the first file
    // that is executed for testing
    section.use(new SpecReporter());


    // lets do some preparations before we execute
    // the actual tests
    section.setup(async () => {

        await doSetupThings();

        // print status
        section.info('Things are set up!');
    });


    // now lets execute some tests
    section('Outer Group', (section) => {
        section('Inner Group', (section) => {

            section.test('Test a', async() => {
                const result = await doSomething();
                asser(result);
            });

            section.test('Test a', async() => {
                const result = await doAnotherThing();
                asser(result);

                // print a neat log message
                section.success(`Got result ${result}`);
            });
        });
    });


The resulting output looks like this:

![](https://github.com/distributed-systems/section-tests/raw/master/doc/screenshot-2.png)




## API


### Creating a test group

Tests must be organized in groups. In order to create a group the section can be invoked

    const section = import Section from 'section-tests';

    // create a new group
    section('group', (section) => {

        // one can create unlimited nested groups by 
        // using the section passed to the callback
        // to the section function
        section('nested group', (section) => {

        });
    });


### Creating a test

Tests must be part of a test group

    const section = import Section from 'section-tests';

    // create a new group
    section('group', (section) => {

        // the section variable passed above to this
        // function can be used to execute tests
        section.test('test name', async() => {

            // run your tests in here, make sure this
            // function is async or returns a promise 
        });
    });




### Defining timeouts

The deafult timeout for tests is 2 seconds

**global timeout**

The global timeout can be altered by calling the setTimeout method
on the global section object

    const section = import Section from 'section-tests';

    // increases the global timeout to 3 seconds
    section.setTimeout(3000);


**individual test timeout**

The indivdual timeout for each test can be set on the section
object the test is executed on

    const section = import Section from 'section-tests';

    // create a new group
    section('group', (section) => {

        // define test
        section.test('test name', async() => {

            // increases timeout to 10 seconds for this 
            // test only
            section.setTimeout(10000);
        });
    });


### Enabling a repoter

Currently only there is only one reporter, the spec reporter.
It writes the output of the tests to the console.

The reporter msut be set in the first file that is executed
for all tests.


    import section, {SpecReporter} from 'section-tests';

    // add the spec reported
    section.use(new SpecReporter());



### Writing logs

Tests may output additional log messages. They are displayed inline
of the test ourput.

    const section = import Section from 'section-tests';

    // create a new group
    section('group', (section) => {

        // define test
        section.test('test name', async() => {

            // log something
            section.info('important message!');
        });
    });


The available log methods are:

- notice
- debug
- warn
- error
- success