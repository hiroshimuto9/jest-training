describe('Math.random with spyOn', () => {
  let spy
  afterEach(() => {
    spy.mockRestore() // モック関数を元の関数へ戻す
    // jest.restoreAllMocks() // すべてのモック化した関数をオリジナルの関数へ戻す
  })

  it('Math.random return 1', () => {
    spy = jest.spyOn(Math, 'random').mockImplementation(() => 1)
    expect(Math.random()).toBe(1);
  })

  it('Math.random return under 1', () => {
    expect(Math.random()).toBeLessThan(1);
  })
})