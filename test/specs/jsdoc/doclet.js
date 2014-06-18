/*global describe, env, expect, it, jasmine */
'use strict';

describe('jsdoc/doclet', function() {
    // TODO: more tests
    var Doclet = require('jsdoc/doclet').Doclet;

    var docSet = jasmine.getDocSetFromFile('test/fixtures/doclet.js');
    var test1 = docSet.getByLongname('test1')[0];
    var test2 = docSet.getByLongname('test2')[0];

    var expectList = '* List item 1';
    var expectStrong = '**Strong** is strong';

    it('does not mangle Markdown in a description that uses leading asterisks', function() {
        expect(test2.description.indexOf(expectList)).toBeGreaterThan(-1);
        expect(test2.description.indexOf(expectStrong)).toBeGreaterThan(-1);
    });

    describe('setScope', function() {
        it('should accept the correct scope names', function() {
            function setScope(scopeName) {
                var doclet = new Doclet('/** Huzzah, a doclet! */', {});
                doclet.setScope(scopeName);
            }

            Object.keys(require('jsdoc/name').SCOPE_NAMES).forEach(function(scopeName) {
                expect( setScope.bind(null, scopeName) ).not.toThrow();
            });
        });

        it('should throw an error for invalid scope names', function() {
            function setScope() {
                var doclet = new Doclet('/** Woe betide this doclet. */', {});
                doclet.setScope('fiddlesticks');
            }

            expect(setScope).toThrow();
        });
    });
});
