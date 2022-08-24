import { expect } from 'chai'
import { inc, is } from './index.js'

describe('autoinc inc', () => {
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
    expect(inc('z')).to.equal('00')
    expect(inc('00')).to.equal('01')
    expect(inc('0zzzz')).to.equal('10000')
    expect(inc('zzzzz')).to.equal('000000')
    expect(inc('10000z')).to.equal('100010')
  })

  it('zero-pads starting number when requested', () => {
    expect(inc(undefined, 5)).to.equal('00000')
  })

  it('pads number when requested', () => {
    expect(inc('P3', 5)).to.equal('000P4')
  })

  it('padded numbers can grow', () => {
    expect(inc('12345678', 5)).to.equal('12345679')
  })
})

describe('autoinc is', () => {
  it('compares 2 strings', () => {
    expect(is('a').lt('b')).to.equal(true)
    expect(is('a').gt('b')).to.equal(false)
    expect(is('a').eq('b')).to.equal(false)
  })

  it('handles empty values', () => {
    expect(is().lt('b')).to.equal(true)
    expect(is('b').lt(null)).to.equal(false)
    expect(is('').eq(null)).to.equal(true)
  })

  it('compares different sizes correctly', () => {
    expect(is('0000').lt('b')).to.equal(false)
    expect(is('A').lt('0A')).to.equal(true)
  })
})
