import { expect } from 'chai'
import { inc } from './index.js'

describe('alphacounter inc', () => {
  it('starts at 0', () => {
    expect(inc()).to.equal('0')
    expect(inc(undefined)).to.equal('0')
    expect(inc(null)).to.equal('0')
    expect(inc('')).to.equal('0')
  })

  it('increments past 0', () => {
    expect(inc('0')).to.equal('1')
  })

  it('increments past 9', () => {
    expect(inc('9')).to.equal('A')
    expect(inc('Z')).to.equal('a')
  })

  it('increments correctly', () => {
    expect(inc('z')).to.equal('10')
    expect(inc('00')).to.equal('01')
    expect(inc('0zzzz')).to.equal('10000')
    expect(inc('zzzzz')).to.equal('100000')
    expect(inc('10000z')).to.equal('100010')
  })

  it('zero-pads starting number when requested', () => {
    expect(inc(undefined, 5)).to.equal('00000')
  })

  it('pads number when requested', () => {
    expect(inc('P3', 5)).to.equal('000P4')
  })

  it('pads number when requested', () => {
    expect(inc('0z', 2)).to.equal('10')
  })

  it('padded numbers can grow', () => {
    expect(inc('12345678', 5)).to.equal('12345679')
  })
})

describe('alphacounter inc.is', () => {
  it('compares 2 strings', () => {
    expect(inc.is('a').lt('b')).to.equal(true)
    expect(inc.is('a').gt('b')).to.equal(false)
    expect(inc.is('a').eq('b')).to.equal(false)
  })

  it('handles empty values', () => {
    expect(inc.is().lt('b')).to.equal(true)
    expect(inc.is('b').lt(null)).to.equal(false)
    expect(inc.is('').eq(null)).to.equal(true)
  })

  it('compares different sizes correctly', () => {
    expect(inc.is('0000').lt('b')).to.equal(true)
    expect(inc.is('A').lt('0A')).to.equal(false)
    expect(inc.is('A').eq('0A')).to.equal(true)
  })

  it('compares correctly', () => {
    const counter = inc('F8'); // F9

    expect(inc.is(counter).gt('A')).to.equal(true);
    expect(inc.is(counter).gt('00A')).to.equal(true);
    expect(inc.is(counter).eq('000F9')).to.equal(true);
    expect(inc.is(undefined).lt('0')).to.equal(true);
  })
})

describe('alphacounter inc.from', () => {
  it('creates a counter from a number', () => {
    expect(inc.from(0)).to.equal('0')
    expect(inc.from(61)).to.equal('z')
    expect(inc.from(62)).to.equal('10')
  })

  it('creates all counters from numbers correctly', () => {
    for (let i = 0, count; i < 10000; i++) {
      count = inc(count)
      expect(inc.from(i)).to.equal(count)
    }
  })

  it('creates a counter from a number adding padding', () => {
    expect(inc.from(0, 3)).to.equal('000')
    expect(inc.from(61, 3)).to.equal('00z')
    expect(inc.from(62, 3)).to.equal('010')
  })

  it('creates all counters from numbers correctly with padding', () => {
    for (let i = 0, count; i < 10000; i++) {
      count = inc(count, 4)
      expect(inc.from(i, 4)).to.equal(count)
    }
  })

  describe('alphacounter inc.to', () => {
    it('converts a counter to a number', () => {
      expect(inc.to('0')).to.equal(0)
      expect(inc.to('z')).to.equal(61)
      expect(inc.to('00')).to.equal(0)
      expect(inc.to('10')).to.equal(62)
    })

    it('converts all counters to numbers correctly', () => {
      for (let i = 0, count; i < 10000; i++) {
        count = inc(count)
        expect(inc.to(count)).to.equal(i)
      }
    })

    it('converts a counter to a number adding padding', () => {
      expect(inc.to('000', 3)).to.equal(0)
      expect(inc.to('00z', 3)).to.equal(61)
      expect(inc.to('010', 3)).to.equal(62)
    })

    it('converts all counters to numbers correctly with padding', () => {
      for (let i = 0, count; i < 10000; i++) {
        count = inc(count, 4)
        expect(inc.to(count, 4)).to.equal(i)
      }
    })
  })

  describe('alphacounter inc.invert', () => {
    it('inverts a counter', () => {
      expect(inc.invert('0')).to.equal('z')
      expect(inc.invert('z')).to.equal('0')
      expect(inc.invert('00')).to.equal('zz')
    })

    it('inverts a counter adding padding', () => {
      expect(inc.invert('0', 3)).to.equal('zzz')
      expect(inc.invert('0z0', 3)).to.equal('z0z')
    })
  })
})
