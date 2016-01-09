// Tests must be: 
// 1. Located in the test/ folder. 
// 2. end with _test.js

// This is how you import a file
import num from '../src/js/testing';

describe('Num', () => {
  it('should return 1', () => {
    num().should.equal(1);
  });
});

describe('karma test with Chai', function() {
  it('should expose the Chai assert method', function() {
    assert.ok('everything', 'everything is ok');
  });

  it('should expose the Chai expect method', function() {
    expect('foo').to.not.equal('bar');
  });

  it('should expose the Chai should property', function() {
    (1).should.not.equal(2);
    should.exist(123);
  });
});
