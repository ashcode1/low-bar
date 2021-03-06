/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function() {
  'use strict';

  it('is an object', function() {
    expect(_).to.be.an('object');
  });

  // IDENTITY
  
  describe('#identity', function() {
    it('should return the same value that is used as the argument', function() {
      const result = _.identity('test');
      expect(result).to.equal('test');
    });
  });

  // FIRST

  describe('#first', function() {
    it('should return first item in the array', function() {
      const arr = [1, 2, 3];
      const result = _.first(arr);
      expect(result).to.eql(1);
    });
    it('should return n number of items from beggining of array', function() {
      const arr = [1, 2, 3, 4, 5];
      const result = _.first(arr, 3);
      expect(result).to.eql([1, 2, 3]);
    });
  });

  // LAST

  describe('#last', function() {
    it('should return last item in the array', function() {
      const arr = [1, 2, 3];
      const result = _.last(arr);
      expect(result).to.eql(3);
    });
    it('should return n number of items from end of array', function() {
      const arr = [1, 2, 3, 4, 5];
      const result = _.last(arr, 3);
      expect(result).to.eql([3, 4, 5]);
    });
  });

  // EACH

  describe('#each', function() {
    it('should count list items', function() {
      const list = ['a', 'b', 'c', 'd', 'e'];
      let counter = 0;
      const addToCounter = function() {
        return counter++;
      };
      _.each(list, addToCounter);
      expect(counter).to.equal(list.length);
    });
    it('should return the list passed', function() {
      const list = ['a', 'b', 'c', 'd', 'e'];
      let counter = 0;
      const addToCounter = function() {
        return counter++;
      };
      const result = _.each(list, addToCounter);
      expect(result).to.eql(list);
    });
    it('should call the iteratee with three paramaters: element, index, list OR value, key, list', function() {
      const list = ['a'];
      const spy = sinon.spy();
      _.each(list, spy);
      const argsPassedToIteratee = spy.args[0];
      expect(argsPassedToIteratee.length).to.equal(3);
    });
    it('it should bind iteratee to context if context is present', function() {
      const spy = sinon.spy();
      const list = ['a', 'b', 'c'];
      const context = {
        a: 'd',
        b: 'e',
        c: 'f'
      };
      _.each(list, spy, context);
      // checking spy properties
      const callCount = spy.callCount;
      const firstCall = spy.firstCall.thisValue;
      const secondCall = spy.secondCall.thisValue;
      const thirdCall = spy.thirdCall.thisValue;
      expect(callCount).to.be.equal(3);
      expect(firstCall).to.be.eql(context);
      expect(secondCall).to.be.eql(context);
      expect(thirdCall).to.be.eql(context);
    });
  });

  // INDEXOF

  describe('#indexOf', function() {
    it('should return index value passed', function() {
      let result = _.indexOf([1, 2, 3], 3);
      expect(result).to.equal(2);

      result = _.indexOf(['ash', 'adie'], 'adie');
      expect(result).to.equal(1);

      result = _.indexOf(['ash', false, 2], false);
      expect(result).to.equal(1);
    });
    it('should return -1 if value is not present in array', function() {
      const result = _.indexOf([1, 2, 3], 4);
      expect(result).to.equal(-1);
    });
    it('it should start search from 3rd argument (if passed)', function() {
      const result = _.indexOf(['test', 1, 8, 3, 'test', 5, 6], 'test', 2);
      expect(result).to.equal(4);
    });
  });

  // FILTER

  describe('#filter', function() {
    it('should return an array', function() {
      const result = _.filter();
      expect(result).to.be.an('array');
    });
    it('should return an array of all the values that pass a truth test (predicate)', function() {
      let result = _.filter([1, 2, 3, 4, 5, 6], function(num) {
        return num % 2 == 0;
      });
      expect(result).to.eql([2, 4, 6]);

      result = _.filter(['banana', 'apple', 'pear', 'banana'], function(str) {
        if (str === 'banana') return str;
      });
      expect(result).to.eql(['banana', 'banana']);
    });
    it('should return an array of all the values that pass a truth test (predicate) when passed an object', function() {
      const result = _.filter({
        'apple': 1,
        'banana': 2,
        'pear': 3,
        'kiwi': 4,
        'stone': 5,
        'tree': 6
      }, function(elem) {
        return elem % 2 == 0;
      });
      expect(result).to.eql([2, 4, 6]);
    });
  });

  // REJECT

  describe('#reject', function() {
    it('should return an array', function() {
      const result = _.reject();
      expect(result).to.be.an('array');
    });
    it('should return an array of all the values that fail a truth test (predicate)', function() {
      const result = _.reject([1, 2, 3, 4, 5, 6], function(num) {
        return num % 2 == 0;
      });
      expect(result).to.eql([1, 3, 5]);
    });
    it('should return an array of all the values that fail a truth test (predicate) when passed an object', function() {
      const result = _.reject({
        'apple': 1,
        'banana': 2,
        'pear': 3,
        'kiwi': 4,
        'stone': 5,
        'tree': 6
      }, function(elem) {
        return elem % 2 == 0;
      });
      expect(result).to.eql([1, 3, 5]);
    });
  });

  // UNIQ

  describe('#uniq', function() {
    it('should return an array', function() {
      const result = _.uniq();
      expect(result).to.be.an('array');
    });
    it('should produce a duplicate-free version of the array', function() {
      const result = _.uniq([1, 2, 1, 4, 1, 3]);
      expect(result).to.be.eql([1, 2, 4, 3]);
    });
  });

  // MAP

  describe('#map', function() {
    it('should return an array', function() {
      const arr = [1, 2, 3];
      const iteratee = function() {
        return arr;
      };
      const result = _.map(arr, iteratee);
      expect(result).to.be.an('array');
    });
    it('should return an empty array if list is undefined', function() {
      const result = _.map();
      expect(result).to.eql([]);
    });
    it('should return an array of equal length to input array', function() {
      const arr = [1, 2, 3, 4, 5];
      const iteratee = function(num = num * 2) {
        return arr;
      };
      const result = _.map(arr, iteratee);
      expect(result.length).to.eql(5);
    });
    it('should return an array if list is object', function() {
      const result = _.map({});
      expect(result).to.eql([]);
    });
  });

  // CONTAINS

  describe('#contains', function() {
    it('should return true if the array contains the parameter', function() {
      expect(_.contains([1, 2, 3], 3)).to.equal(true);
    });
    it('should return false if the array does not contain the parameter', function() {
      expect(_.contains([1, 2, 3], 4)).to.equal(false);
    });
    it('should start searching at the index provided as the third argument', function() {
      expect(_.contains([1, 2, 3], 1, 1)).to.equal(false);
      expect(_.contains([1, 2, 3], 1, 0)).to.equal(true);
    });
  });

  // PLUCK

  describe('#pluck', function() {
    it('should extract a list of property values', function() {
      const stooges = [{
        name: 'moe',
        age: 40
      }, {
        name: 'larry',
        age: 50
      }, {
        name: 'curly',
        age: 60
      }];
      expect(_.pluck(stooges, 'name')).to.eql(['moe', 'larry', 'curly']);
    });
  });

  // REDUCE

  describe('#reduce', function() {
    it('should reduce an array to a single value by accumulation and iteratee', function() {
      expect(_.reduce(['w', 'o', 'r', 'd'], function(memo, str) {
        return memo + str;
      }, '')).to.equal('word');
      expect(_.reduce([2, 4, 6, 8, 10], function(memo, num) {
        return memo + num / 2;
      }, 0)).to.equal(15);
    });
    it('if memo is not passed, the first element of the array is used', () => {
      const list = [1, 2, 3];
      expect(_.reduce(list, function(memo, num) {
        return memo + num;
      })).to.eql(6);
    });
    it('should reduce an object to a single value by accumulation and iteratee', function() {
      expect(_.reduce({
        a: 'w',
        b: 'o',
        c: 'r',
        d: 'd'
      }, function(memo, str) {
        return memo + str;
      }, '')).to.equal('word');
      expect(_.reduce({
        a: 2,
        b: 4,
        c: 6,
        d: 8,
        e: 10
      }, function(memo, num) {
        return memo + num / 2;
      }, 0)).to.equal(15);
    });
  });

  // EVERY

  describe('#every', function() {
    it('should return true if all list values pass predicate test', function() {
      expect(_.every([2, 4, 6], function(num) {
        return num % 2 == 0;
      })).to.equal(true);
    });
    it('should return false if not all list values pass predicate test', function() {
      expect(_.every([2, 4, 7], function(num) {
        return num % 2 == 0;
      })).to.equal(false);
    });
    it('should bind the iteratee to context if context provided', function() {
      const spy = sinon.spy();
      const collection = [1, 2, 3];
      const context = {
        a: 2,
        b: 4,
        c: 6
      };
      _.every(collection, spy, context);
      const callCount = spy.callCount;
      const firstCall = spy.firstCall.thisValue;
      const secondCall = spy.secondCall.thisValue;
      const thirdCall = spy.thirdCall.thisValue;
      expect(callCount).to.be.equal(3);
      expect(firstCall).to.be.eql(context);
      expect(secondCall).to.be.eql(context);
      expect(thirdCall).to.be.eql(context);
    });
  });

  // SOME

  describe('#some', function() {
    it('should return true if any list values pass predicate truth test', function() {
      expect(_.some([2, 5, 7], function(num) {
        return num % 2 === 0;
      })).to.equal(true);
    });
    it('should return false if no list values pass predicate truth test', function() {
      expect(_.some([3, 5, 7], function(num) {
        return num % 2 === 0;
      })).to.equal(false);
    });
    it('should bind the iteratee to context if context provided', function() {
      const spy = sinon.spy();
      const collection = [1, 2, 3];
      const context = {
        a: 2,
        b: 4,
        c: 6
      };
      _.every(collection, spy, context);
      const callCount = spy.callCount;
      const firstCall = spy.firstCall.thisValue;
      const secondCall = spy.secondCall.thisValue;
      const thirdCall = spy.thirdCall.thisValue;
      expect(callCount).to.be.equal(3);
      expect(firstCall).to.be.eql(context);
      expect(secondCall).to.be.eql(context);
      expect(thirdCall).to.be.eql(context);
    });
  });

  // EXTEND

  describe('#extend', function() {
    it('should shallow copy source properties to destination object', function() {
      expect(_.extend({
          a: 'apple'
        }, {
          b: 'banana'
        }, {
          c: 'clementine'
        }))
        .to.eql({
          a: 'apple',
          b: 'banana',
          c: 'clementine'
        });
    });
    it('should override properties of the same name in previous arguments using the last source with that name', function() {
      const destination = {
        a: 'apple'
      };
      const source1 = {
        b: 'banana'
      };
      const source2 = {
        c: 'clementine'
      };
      const source3 = {
        b: 'butternut squash'
      };
      const expected = {
        a: 'apple',
        b: 'butternut squash',
        c: 'clementine'
      };
      expect(_.extend(destination, source1, source2, source3)).to.eql(expected);
    });
  });

  // DEFAULTS

  describe('#defaults', function() {
    it('should fill in undefined properties in object with first value in following list of defaults objects', function() {
      const apple = {
        colour: 'green'
      };
      const expected = {
        colour: 'green',
        amount: 4
      };
      expect(_.defaults(apple, {
        colour: 'red',
        amount: 4
      })).to.eql(expected);
    });
  });

  // ONCE

  describe('#once', function() {
    it('function should only be called once', function() {
      const spy = sinon.spy();
      const testLimit = _.once(spy);
      _.once(spy);
      _.once(spy);
      _.once(spy);
      _.once(spy);
      _.once(spy);
      _.once(spy);
      testLimit();
      expect(spy.callCount).to.equal(1);
    });
  });

  // SHUFFLE

  describe('#shuffle', function() {
    it('should return a shuffled copy of list using Fisher-Yates shuffle if list is an array', function() {
      const list = [1, 2, 3, 4, 5, 6];
      const output = _.shuffle(list);
      expect(list.length).to.equal(output.length);
      expect(output).to.have.members(list);
    });
    it('should return a shuffled copy of list using Fisher-Yates shuffle if list is an object', function() {
      const list = {
        'a': 1,
        'b': 2,
        'c': 3,
        'd': 4,
        'e': 5
      };
      const output = _.shuffle(list);
      const listValues = _.shuffle(list);
      expect(listValues.length).to.equal(output.length);
      expect(output).to.have.members(listValues);
    });
  });

  // INVOKE

  describe('#invoke', function() {
    it('should call the method on every element of the list', function() {
      const list = [
        [5, 1, 7],
        [3, 2, 1]
      ];
      const method = 'sort';
      const expected = [
        [1, 5, 7],
        [1, 2, 3]
      ];
      expect(_.invoke(list, method)).to.eql(expected);
    });
    it('should return an array with undefined if the method doesnt exist', function() {
      const list = {
        '1': 1
      };
      const method = 'splice';
      const expected = [undefined];
      expect(_.invoke(list, method)).to.eql(expected);
    });
    it('should pass arguments to the method if arguments are present', function() {
      const list = [
        [5, 1, 7],
        [3, 2, 1]
      ];
      const method = 'sort';
      const arg = function(a, b) {
        return b - a;
      };
      const expected = [
        [7, 5, 1],
        [3, 2, 1]
      ];
      const actual = _.invoke(list, method, arg);
      expect(actual).to.deep.equal(expected);
    });
  });

  // DELAY

  describe('#delay', function() {
    let spy;
    beforeEach(function() {
      spy = sinon.spy();
    });
    it('should run the function after wait has passed', function() {
      const clock = sinon.useFakeTimers();
      _.delay(spy, 100);
      clock.tick(1);
      expect(spy.callCount).to.eql(0);
      clock.tick(100);
      expect(spy.callCount).to.eql(1);
    });
    it('should call the function with the passed paramater', function() {
      const clock = sinon.useFakeTimers();
      _.delay(spy, 100, 'param');
      clock.tick(100);
      expect(spy.callCount).to.eql(1);
      expect(spy.args).to.eql([
        ['param']
      ]);
    });
  });

  // INTERSECTION

  describe('#intersection', function() {
    it('should compute the list of values that are the intersection of all the arrays and returns them in an array', function() {
      expect(_.intersection([1, 2, 3], [2, 6, 7])).to.be.an('array');
      expect(_.intersection([1, 2, 3], [2, 6, 7])).to.eql([2]);
    });
  });
  describe('#difference', function() {
    it('is a function', function() {
      expect(_.difference).to.be.a('function');
    });
    it('should return the values from array that are not present in the other arrays', function() {
      expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10], [5, 6, 7])).to.eql([1, 3, 4]);
    });
  });
  describe('#flatten', function() {
    it('is a function', function() {
      expect(_.flatten).to.be.a('function');
    });
    it('should flatten a nested array (to any level)', function() {
      expect(_.flatten([1, [2], 3, 4])).to.eql([1, 2, 3, 4]);
      expect(_.flatten([1, [2], [3, 4]])).to.eql([1, 2, 3, 4]);
      expect(_.flatten([1, [2], [3, [4]]])).to.eql([1, 2, 3, 4]);
      expect(_.flatten([1, [2], [3, [[4]]]])).to.eql([1, 2, 3, 4]);
    });
    it('should only concat to one level if shallow is passed', function() {
      expect(_.flatten([1, [2], [3, [[4]]]], true)).to.eql([1, 2, 3, [[4]]]);
    });
  });

  // SORTEDINDEX

  describe('#sortedIndex', function() {
    it('should use binary search to determine the index at which value should be inserted into list', function() {
      const list = [10, 20, 30, 40, 50];
      const value = 35;
      expect(_.sortedIndex(list, value)).to.eql(3);
    });
  });

  // ZIP

  describe('#zip', function() {
    it('should merge together the values of each of the arrays with the values at the corresponding position', function() {
      const output = [
        ['moe', 30, true],
        ['larry', 40, false],
        ['curly', 50, false]
      ];
      expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql(output);
    });
  });

  // SORTBY

  describe('#sortBy', function() {
    it('should return a (stably) sorted copy of the list, ranked in ascending order by the results of running each value though the iteratee', function() {
      const list = [1, 2, 3, 4, 5, 6];
      const iteratee = function(num) {
        return Math.sin(num);
      };
      const expected = [5, 4, 6, 3, 1, 2];
      expect(_.sortBy(list, iteratee)).to.eql(expected);
    });
  });

  // MEMOIZE

  describe('#memoize', function() {
    let multiply, memoMultiply;
      beforeEach(function() {
        multiply = function(a, b) {
          return a * b;
        };
        memoMultiply = _.memoize(multiply);
      });
    it('should memoize a given function by caching the computed result', function() {
      expect(multiply(1, 2)).to.equal(2);
      expect(memoMultiply(1, 2)).to.equal(2);
    });
    it('should only memoize once', function() {
      const spy = sinon.spy();
      const memoSpy = _.memoize(spy);
      memoSpy(10);
      expect(spy.callCount).to.equal(1);
    });
  });
});