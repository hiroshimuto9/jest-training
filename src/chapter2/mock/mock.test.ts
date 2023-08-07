import { chohan } from './chohan'

describe('jest fn()', () => {
  test('mock object specification', () => {
    const mockFunction = jest.fn()

    // mockFunctionの結果はundefined
    expect(mockFunction('foo', 'bar')).toBe(undefined)

    // mockプロパティを持っている
    expect(mockFunction).toHaveProperty('mock')

    // mockにはcallsプロパティを持っている
    expect(mockFunction.mock).toHaveProperty('calls')

    // 1回呼び出された
    expect(mockFunction.mock.calls).toHaveLength(1)

    // 1回呼び出された際に、引数は`foo`と`bar`だった
    expect(mockFunction.mock.calls[0]).toEqual(['foo', 'bar'])

    // mockにはresultsプロパティを持っている
    expect(mockFunction.mock).toHaveProperty('results')

    // 1回呼び出された
    expect(mockFunction.mock.results).toHaveLength(1)

    // 1回目の返り値はundefinedである
    expect(mockFunction.mock.results[0].value).toBe(undefined)

    // 1回目の呼び出しが正常終了した
    expect(mockFunction.mock.results[0].type).toBe('return')
  })
})

// mockImplementationで返り値を設定
test('return "Hello"', () => {
  const mockFunction = jest.fn(() => 'Hello')
  // const mockFunction = jest.fn().mockImplementation(() => 'Hello'); 上記ど同義
  expect(mockFunction()).toBe('Hello')
})

// mockImplementationOnceで呼び出し毎に異なる返り値を設定
test('return "Hello" once then it returns "Goodbye"', () => {
  const mockFunction = jest
    .fn()
    .mockImplementationOnce(() => 'Hello')
    .mockImplementationOnce(() => 'Goodbye')
  expect(mockFunction()).toBe('Hello')
  expect(mockFunction()).toBe('Goodbye')
  expect(mockFunction()).toBe(undefined)
})

jest.mock('./seed', () => {
  // seedをモック化
  return {
    seed: jest
      .fn()
      .mockImplementationOnce(() => 2) // 1回目に偶数を返す
      .mockImplementationOnce(() => 1), // 2回目に奇数を返す
  }
})

describe('chohan', () => {
  it('returns 丁 when seed returns an even number like 2', () => {
    expect(chohan()).toBe('丁')
  })
  it('returns 半 when seed returns an odd number like 1', () => {
    expect(chohan()).toBe('半')
  })
})
