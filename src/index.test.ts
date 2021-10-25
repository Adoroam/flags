import { flags } from './index'

describe('flags', () => {
  test('blank object when no flags supplied', () => {
    expect(flags([])).toStrictEqual({})
  })
  test('blank object when only string', () => {
    const mock = 'string'.split(' ')
    expect(flags(mock)).toStrictEqual({})
  })
  test('blank object when only string with spaces', () => {
    const mock = 'test string'.split(' ')
    expect(flags(mock)).toStrictEqual({})
  })
  test('single flag, no data', () => {
    const mock=['-x']
    expect(flags(mock)).toStrictEqual({ x: 1 })
  })
  test('single flag, with data', () => {
    const mock = '-x hotdog'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog' })
  })
  test('single flag, with spaced data', () => {
    const mock = '-x hotdog bun'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog bun' })
  })
  test('single flag, with multi-spaced data', () => {
    const mock = '-x hotdog and hamburger bun'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog and hamburger bun' })
  })
  test('two flags, no data', () => {
    const mock = '-x -y'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 1, y: 1 })
  })
  test('two flags, with data', () => {
    const mock = '-x hotdog -y bun'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog', y: 'bun' })
  })
  test('two flags, with spaced data', () => {
    const mock = '-x hotdog bun -y white noise'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog bun', y: 'white noise' })
  })
  test('two flags combined, no data', () => {
    const mock = ['-xy']
    expect(flags(mock)).toStrictEqual({ x: 1, y: 1 })
  })
  test('two flags combined, with data', () => {
    const mock = '-xy word'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'word', y: 'word' })
  })
  test('large flag, no data', () => {
    const mock = ['--xy']
    expect(flags(mock)).toStrictEqual({ xy: 1 })
  })
  test('large flag, with data', () => {
    const mock = '--xy cat'.split(' ')
    expect(flags(mock)).toStrictEqual({ xy: 'cat' })
  })
  test('small flag, large flag, no data', () => {
    const mock = '-a --xy'.split(' ')
    expect(flags(mock)).toStrictEqual({ a: 1, xy: 1 })
  })
  test('small flag, with data large flag, with data', () => {
    const mock = '-a horse --xy scooter'.split(' ')
    expect(flags(mock)).toStrictEqual({ a: 'horse', xy: 'scooter' })
  })
  test('small flag, with data large flag, with spaced data', () => {
    const mock = '-a horse girl --xy scooter'.split(' ')
    expect(flags(mock)).toStrictEqual({ a: 'horse girl', xy: 'scooter' })
  })
})
