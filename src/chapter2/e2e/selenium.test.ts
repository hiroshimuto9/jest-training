import {
  WebDriver,
  Builder,
  By,
  Key,
  until,
  Capabilities,
} from 'selenium-webdriver'

jest.setTimeout(30000) // タイムアウトを30秒に延長

describe('e2e test with selenium and chromeDriver', () => {
  let chromeDriver: WebDriver

  // WebDriver、Chrome ブラウザをセットアップ
  beforeAll(async () => {
    const chromeCapabilities = Capabilities.chrome()
    chromeCapabilities.set('goog:chromeOptions', {
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--lang=en-US',
        '--user-data-dir=./tmp_user_data', //--headlessを外す場合は有効化する
      ],
    })
    // Chromeを起動しWebDriverのインスタンスを取得
    chromeDriver = await new Builder()
      .withCapabilities(chromeCapabilities)
      .build()
  })

  // Chrome を終了する設定
  afterAll(async () => {
    await chromeDriver.quit() // Chromeを停止する
  })

  it('a search keyword will be on the page title in google.com', async () => {
    // google.comにアクセス
    await chromeDriver.get('https://www.google.com/ncr')
    // 検索ボックスの要素を取得し、webdriver、エンターキーを入力
    await chromeDriver
      .findElement(By.name('q'))
      .sendKeys('webdriver', Key.RETURN)
    // ページのタイトルが`webdriver - Google Search`であることを確認
    const results = await chromeDriver.wait(
      until.titleIs('webdriver - Google Search'),
      10000,
    )
    expect(results).toBe(true)
  })
})
