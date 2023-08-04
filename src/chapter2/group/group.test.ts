describe('グループ名', () => {
  test('test1', () => {
    expect(true).toBe(true)
  })
  test('test2', () => {
    expect(true).toBe(true)
  })
  test('test3', () => {
    expect(true).toBe(true)
  })

  // 入れ子でグループ定義可能
  describe('入れ子グループ名', () => {
    test('test4', () => {
      expect(true).toBe(true)
    })
  })
})

describe('test eachの利用', () => {
  test.each([
    { a: 1, b: 1, expected: 2 },
    { a: 1, b: 2, expected: 3 },
    { a: 2, b: 1, expected: 3 },
  ])
  ('.add($a, $b)', ({a, b, expected}) => {
    expect(a + b).toBe(expected)
  })
})

// 入力値と期待値だけが異なるテストケースは以下のようにまとめることで記述が単純になる
// 消費税を計算。税率を10%に固定。
const calculateSalesTax = (price: number) => price > 0 ? Math.floor((price / 100) * 10) : 0

describe('calculateSalesTax with Parameterized Test', () => {
  test.each([
    { price: 100, expected: 10 },
    { price: 99, expected: 9 },
    { price: 1, expected: 0 },
    { price: 0.1, expected: 0 },
    { price: 0, expected: 0 },
    { price: -1, expected: 0 },
  ])('calculates the sales tax for a price equal to $price', ({ price, expected}) => {
    expect(calculateSalesTax(price)).toBe(expected)
  })
})

// describeを複数利用した入れ子構造での前後処理が実行されるタイミングの確認
describe('before/after timing', () => {
  // グループ1
  beforeAll(() => console.log('1 - beforeAll'))
  afterAll(() => console.log('1 - afterAll'))
  beforeEach(() => console.log('1 - beforeEach'))
  afterEach(() => console.log('1 - afterEach'))
  // グループ1のテスト
  test('test group1', () => console.log('1 - test1'))

  // グループ2
  describe('Scoped/Nested block', () => {
    // グループ2
    beforeAll(() => console.log('2 - beforeAll'))
    afterAll(() => console.log('2 - afterAll'))
    beforeEach(() => console.log('2 - beforeEach'))
    afterEach(() => console.log('2 - afterEach'))

    // グループ2のテスト
    test('test group2', () => console.log('2 - test1'))
    test('test group2', () => console.log('2 - test2'))
  })
})

// 1秒後に`lemon`文字列を返却
const fetchData = () => new Promise(resolve => setTimeout(resolve, 1000, 'lemon'))
// fetchData関数を100回実行するテスト // skipを追加
test.concurrent.skip.each(
  Array.from(new Array(100).keys()).map(n => 
    ({ n,expected: 'lemon', })
  ),)
  ('concurrent tests $n', async ({ n, expected }) => {
    console.log(n)
    await expect(fetchData()).resolves.toBe(expected)
  }
)