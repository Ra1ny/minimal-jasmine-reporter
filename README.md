# minimal-karma-jasmine-reporter
Single line, coloured, descriptive karma jasmine reporter, improved upon dots reporter. Great for fixing tests.

## Install

```
$ npm install minimal-karma-jasmine-reporter --save-dev
```

## Configuration
```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    // reporters configuration
    reporters: ['minimal']
  });
};
```

## Options
Define which colors are applied on icons in case of success, failure and ignore.

Use the [chalk colors](https://github.com/sindresorhus/chalk#colors) to customize it.

**Example:**
```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    // reporters configuration
    reporters: ['minimal'],

    minimalReporter: {
      color: {
        success : 'blue',
        failure : 'yellow',
        ignore  : 'grey'
      }
    }
  });
};
```
