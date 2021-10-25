import { chDashes, rmDashes } from './util'

describe('chDashes', () => {
  test('no dashes', () => {
    expect(chDashes('apple')).toBe(0)
  })
  test('small flag', () => {
    expect(chDashes('-a')).toBe(1)
  })
  test('small multi-flag', () => {
    expect(chDashes('-ab')).toBe(1)
  })
  test('large flag', () => {
    expect(chDashes('--apple')).toBe(2)
  })
  test('large flag (multiple)', () => {
    expect(chDashes('---apple')).toBe(2)
  })
})

describe('rmDashes', () => {
  test('no dashes', () => {
    expect(rmDashes('apple')).toBe('apple')
  })
  test('small flag', () => {
    expect(rmDashes('-a')).toBe('a')
  })
  test('small flag caps', () => {
    expect(rmDashes('-A')).toBe('a')
  })
  test('small multi-flag', () => {
    expect(rmDashes('-ab')).toBe('ab')
  })
  test('small multi-flag caps', () => {
    expect(rmDashes('-AB')).toBe('ab')
  })
  test('large flag', () => {
    expect(rmDashes('--apple')).toBe('apple')
  })
  test('large flag caps', () => {
    expect(rmDashes('--Apple')).toBe('apple')
  })
  test('large flag (multiple)', () => {
    expect(rmDashes('---apple')).toBe('-apple')
  })
})
