const numberVal = 0;
const stringVal = '文字列';
const booleanVal = true;

// toBeでプリミティブな値を評価
test('toBe', () => {
  expect(numberVal).toBe(0);
  expect(stringVal).toBe('文字列');
  expect(booleanVal).toBe(true);
})

// toEqualでプリミティブな値を評価
test('toEqual', () => {
  expect(numberVal).toEqual(0);
  expect(stringVal).toEqual('文字列');
  expect(booleanVal).toEqual(true);
})

// toStrictEqualでプリミティブな値を評価
test('toStrictEqual', () => {
  expect(numberVal).toStrictEqual(0);
  expect(stringVal).toStrictEqual('文字列');
  expect(booleanVal).toStrictEqual(true);
})

// canの型を定義
type CanType = {
  flavor: string
  ounces: number
}
// can1とcan2はそれぞれ同じプロパティと同じ値を持つ
const can1: CanType = {
  flavor: 'grapefruit',
  ounces: 12,
}

const can2: CanType = {
  flavor: 'grapefruit',
  ounces: 12,
}

// can3はcan2の参照を持つ
const can3: CanType = can2

// Canクラス
class Can {
  flavor: string
  ounces: number

  constructor({ flavor, ounces }: CanType) {
    this.flavor = flavor
    this.ounces = ounces
  }
}

// can4はCanクラスで生成されたオブジェクトでcan1、can2と同じプロパティを持つ
const can4 = new Can({
  flavor: 'grapefruit',
  ounces: 12,
})

// can1とcan2は参照が等しくないので、等しくないと評価される
test('can1 and can2 are not the exact same instance', () => {
  expect(can1).not.toBe(can2)
})

// can2とcan3は参照が等しいので、等しいと評価される
test('can2 and can3 are the exact same instance', () => {
  expect(can2).toBe(can3)
})

// toEqualを利用する場合
// オブジェクトのプロパティを再帰的に評価するため、異なるインスタンスでも同じプロパティ、値を持っている場合等しいと評価される
test('can1 and can2 have the same properties', () => {
  expect(can1).toEqual(can2)
})

// can2とcan4は生成元が異なるが、同じプロパティ、値を持っているため等しいと評価される
test('can2 and can4 have the same properties', () => {
  expect(can3).toEqual(can4)
})

// toStrictEqualを利用する場合
// オブジェクトの生成元のクラスまでチェックする
test('can2 and can4 are the different class', () => {
  expect(can2).not.toStrictEqual(can4)
})

// toEqualとは異なり、undefinedが設定されているプロパティをチェックし、配列内の未定義の要素とundefinedを異なるものとして評価する。
test('differences between toEqual and toStrictEqual', () => {
  // toEqual: undefinedを持つプロパティは無視されるため、等しいと評価
  expect({foo: NaN, bar: undefined}).toEqual({foo: NaN});
  // toStrictEqual: undefinedを持つプロパティもチェックされるので、等しくないと評価
  expect({ foo: NaN, bar: undefined }).not.toStrictEqual({ foo: NaN })
  // toEqual: 未定義の要素とundefinedの要素を区別しないので、等しいと評価
  expect([, undefined, 1]).toEqual([undefined, , 1])
  // toStrictEqual:未定義の要素とundefinedの要素を区別するので、等しくないと評価
  expect([, undefined, 1]).not.toStrictEqual([undefined, , 1])
})

// TruthyとFalsyの評価
test('"0" should be Truthy', () => {
  expect("0").toBeTruthy()
})

test('0 should be Falsy', () => {
  expect(0).toBeFalsy()
})

// nullとundefinedの評価
test('should be null', () => {
  expect(null).toBe(null)
  expect(null).toBeNull()
})

test('should be undefined', () => {
  expect(undefined).toBe(undefined)
  expect(undefined).toBeUndefined()
})

test('should be null or undefined', () => {
  let a // undefined
  expect(a == null).toBe(true)
  a = null // null
  expect(a == null).toBe(true)
})

const hoge = () => ({ hoge: 'hoge', number: 0})

test('hoge return anything', () => {
  // 期待値がnullやundefinedでないことを評価
  expect(hoge()).toEqual(expect.anything())
  // 期待値の一部のプロパティがnullやundefinedでないことを評価
  expect(hoge()).toEqual({
    hoge: 'hoge',
    number: expect.anything()
  })
  // 期待値の一部のプロパティnumberがNumber型であることを評価
  expect(hoge()).toEqual({
    hoge: 'hoge',
    number: expect.any(Number)
  })
})