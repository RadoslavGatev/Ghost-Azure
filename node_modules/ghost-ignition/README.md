# Ignition

![Build Status](https://github.com/TryGhost/Ignition/workflows/Test/badge.svg?branch=master)

Basic configuration and tooling shared across applications

# Install

`npm install ghost-ignition --save`

or

`yarn add ghost-ignition`

# Usage

Ignition offers the following features:

- Logging
- Errors
- Config using nconf
- HTTP Server
- Debug

## Logging

### Configuration

|Property|Type|Required|Default|Description|
|---|---|---|---|---|
|domain|String|No|'localhost'| The domain of your service. The domain is used to generate the log filenames.|
|env|String|No|'development'| The environment is used for to generate the log filenames.
|mode|String|No|'short'| A specific option for stdout/stderr logging. You can configure if the logger should log with "long" (many information) or "short" (less information) output. 
|level|String|No|'info'| Configure the default log level. The log level ("info", "warn", "error") defines which logs should be piped into stdout and log files.
|transports|Array|No|['stdout']| A comma separated list of transports. Available transports are: file, stdout, stderr, loggly, gelf
|rotation|Object|No|{enabled: true, period: '1w', count: 100}| If file transport is enabled, you can configure if you would like to enable log rotation.
|path|String|No|process.cwd()| If file transport is enabled, the path config can be used to define the target log folder.
|loggly|Object|No|null| If loggly transport is enabled, you can send your logs to loggly.
|gelf|Object|No|null| If GELF transport is enabled, you can send your logs to GELF collector.

Example:

```js
const ignition = require('ghost-ignition');

const logging = ignition.logging({
    domain: 'example.com',
    env: 'production',
    mode: 'long',
    level: 'info',
    transports: ['file'],
    rotation: {enabled: true, period: '1d', count: 10},
    path: '/var/log'
});
```

### Examples

```js
logging.info({req: req, res: res});
logging.info({req: req, res: res, err: err});
logging.info('Info');
logging.error(new Error());
logging.warn('this', 'is', 'a', 'warning');
logging.debug('this is a debug mode');
logging.warn(err, 'Caught an error from service X.');
logging.warn('A friendly message.', err);
logging.warn('A friendly message.', {err: err});
```

### Transports

#### File

Ignition creates two log files by default:

- An errors log file, which only contains logs from `logging.error`
- A general log file, which contains all logs from `logging.info`, `logging.warn` and `logging.error`

If you would like to open a log file on disk, we highly recommend to install bunyan with NPM (`npm i -g bunyan`). 
You can then open your log file with `bunyan your.log` in the shell, which makes it possible to read the content.

#### Loggly

The loggly transport makes it possible to send your logs to loggly.
The stream will only send errors to loggly at the moment.

Example:

```js
const ignition = require('ghost-ignition');

const logging = ignition.logging({
    transports: ['file', 'loggly'],
    loggly: {
      token: 'token',
      subdomain: 'subdomain',
      // The "match" property is helpful if you only want to send specific errors to loggly. It's a regex string.
      match: 'level:critical' // or 'statusCode:500|statusCode:403'
    },
    ...
});
```

#### GELF

The transport makes it possible to send logs to the GELF UDP collector.

Example:

```
const ignition = require('ghost-ignition');

const logging = ignition.logging({
    transports: ['gelf'],
    gelf: {
      host: 'gelf.example.com', // Default: '127.0.0.1'
      post: 12345               // Default: 12201
    },
    ...
});
```

### Shell

#### ENV Variables

Ignition accepts some env variables to modify the log output.

`LEVEL=error` - Only print errors.
`MODE=long`   - Show full & long log output.
`LOIN=true`   - Set's the level to "info" and the mode to "long". 

## Errors

Ignition errors contains a set of useful & common error classes.
Each Ignition error inherits from [Node's native error](https://nodejs.org/api/errors.html#errors_class_error) and keeps the structure!

### Extra properties

On top of the native error properties (message, code, stack), Ignition errors support the following properties:

|Property|Description
|---|---|
|id|A unique error ID, which every error get's attached.
|statusCode|The HTTP status code.
|level|Indicates if an error is "critical" or "normal".
|errorType|Name/type of the error.
|context|Context the error is in e.g. user was logged in
|help|This property is useful to e.g. show a link to docs.
|errorDetails|Extra detailed information you can pass in.

### List of errors

|Error|Status Code|Level|Description
|---|---|---|---|
|InternalServerError|500|critical|Common error for internal errors.
|IncorrectUsageError|400|critical|Mis-usage inside the code base.
|NotFoundError|404|normal|Common error if a resource/page cannot be found.
|BadRequestError|400|normal|Common error if the request structure is wrong.
|UnauthorizedError|401|normal|Common error if authentication failed.
|NoPermissionError|403|normal|Common error if the request has no permissions.
|ValidationError|422|normal|Common error if the request input/content is invalid.
|UnsupportedMediaTypeError|415|normal|Common error if the media inside a request is unsupported.
|TooManyRequestsError|429|normal|Common error for handling brute forcing.
|MaintenanceError|503|normal|Helpful error if your application is in maintenance mode.
|MethodNotAllowedError|405|normal|Helpful error if e.g. the request method is unsupported.
|RequestEntityTooLargeError|413|normal|Helpful error if file upload is too big.

### Examples

```js
new logging.errors.InternalServerError({
    message: 'Something went very wrong',
    context: {
        user: 1
    }
})

// Ignition supports nested errors. It will try to inherit properties and extend the stack trace.
// This is super useful if you receive an error from a calling unit, but you would like to wrap it into a custom error.
new logging.errors.InternalServerError({
    err: err
})
```

### Error utils

```js
const ignition = require('ghost-ignition');

// you can pass any error and ignition will tell you if this is a custom ignition error
ignition.errors.utils.isIgnitionError(err);

// serialize an error to a specific format
ignition.errors.utils.serialize(err, {format: 'jsonapi|oauth'});

// deserialize specific format to error instance
ignition.errors.utils.deserialize(err);
```

## Config

Ignition config uses nconf to create a configuration object based on your environment.

### Requirements

- Create config files based on your available environments.
- Instantiate Ignition config.
- Read [nconf documentation](https://github.com/indexzero/nconf#readme) to understand how to use the config object.

### Examples

config.example.json (defaults)
```json
{
  "port": 9999
}
```

config.production.json
```json
{
  "host": "blog.com"
}
```

config.development.json
```json
{
  "host": "localhost"
}
```

```js
// As soon as you call the config object, Ignition will read your config files from disk and returns a config object.
// The config object is then cached. You can operate on the config object using `set` and `get` (see [nconf](https://github.com/indexzero/nconf#readme))
const config = require('ghost-ignition').config();

// -> {port: 9999, host: localhost}
```

## Debug

Ignition debug offers an easy way to add debugging to your application.
It wraps the [debug](https://github.com/visionmedia/debug#readme) NPM module to simplify how to add debug information to your files.
Ignition debug will try to read your package.json to get the name/alias of your application.
You can enable the debug log by passing the "DEBUG" environment variable.

### Requirements

- Read [debug documentation](https://github.com/visionmedia/debug#readme).

 
### Examples

package.json
```json
  "name": "myproject",
  "alias": "proj" 
```

```js
const debug = require('ghost-ignition').debug('api-controller');

debug('Calling the model layer.');

// DEBUG=proj:api-controller yarn start
```

## Server

The HTTP server bundles common logic in one place.

- error handling for the HTTP server
- port normalisation

### Requirements

- Express
- Ignition config

### Examples

```js
const ignition = require('ghost-ignition');
ignition.server.start(app);
ignition.server.stop(app);
```

# Test

- `yarn lint` run just eslint
- `yarn test` run eslint && then tests

# Publish

- `yarn ship`

# Copyright & License

Copyright (c) 2013-2021 Ghost Foundation - Released under the [MIT license](LICENSE).
