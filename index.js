import chalk from 'chalk';
import logSymbols from 'log-symbols';
import stripColor from 'strip-ansi';

(function() {
    'use strict';

    const MinimalReporter = function(hasColors, options) {
        chalk.enabled = hasColors;

        // Configuration
        options = options || {};
        options.nbDotsPerLine = options.nbDotsPerLine || 80;
        options.icon = options.icon || {};
        options.icon.failure = options.icon.failure || logSymbols.error;
        options.icon.success = options.icon.success || logSymbols.success;
        options.icon.ignore = options.icon.ignore || logSymbols.info;
        options.color = options.color || {};
        options.color.failure = options.color.failure || 'red';
        options.color.success = options.color.success || 'green';
        options.color.ignore = options.color.ignore || 'blue';
        options.successStatus = options.successStatus || {};
        options.successStatus.printTestName =
            options.successStatus.hasOwnProperty('printTestName')
                ? options.successStatus.printTestName : true;

        if (hasColors) {
            this.USE_COLORS = true;
            options.icon.failure = colorInto(options.color.failure, options.icon.failure);
            options.icon.success = colorInto(options.color.success, options.icon.success);
            options.icon.ignore = colorInto(options.color.ignore, options.icon.ignore);
        } else {
            this.USE_COLORS = false;
            options.icon.failure = noColor(options.icon.failure);
            options.icon.success = noColor(options.icon.success);
            options.icon.ignore = noColor(options.icon.ignore);
        }

        this.onRunStart = function() {
            this._dotsCount = 0;
        };

        this.specSuccess = function(browser, result) {
            if (options.successStatus.printTestName) {
                this._writeCharacterWithFullName(options.icon.success, result);
            } else {
                this._writeCharacter(options.icon.success);
            }
        };

        this.specFailure = function(browser, result) {
            this._writeCharacterWithFullName(options.icon.failure, result);
        };

        this.specSkipped = function(browser, result) {
            this._writeCharacter(options.icon.ignore);
        };

        this.onSpecComplete = function(browser, result) {
            if (result.skipped) {
                this.specSkipped(browser, result);
            } else if (result.success) {
                this.specSuccess(browser, result);
            } else {
                this.specFailure(browser, result);
            }
        };

        this.onRunComplete = function(browser, result) {
            write(`=========== Completed ===========\n`);
        };

        this._writeCharacter = function(character) {
            this._dotsCount = (1 + this._dotsCount) % options.nbDotsPerLine;
            write(this._dotsCount ? character : character + '\n');
        };

        this._writeCharacterWithFullName = function(character, result) {
            write(`${character} ${result.fullName}\n`);
        };
    };

    MinimalReporter.$inject = ['config.colors', 'config.minimalReporter'];

    module.exports = { 'reporter:minimal': ['type', MinimalReporter] };

    function colorInto(color, str) {
        return chalk[color](stripColor(str));
    }

    function noColor(str) {
        return stripColor(str);
    }

    function write(string) {
        process.stdout.write(string);
    }
})();
