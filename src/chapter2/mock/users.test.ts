import axios from "axios";
import Users from "./users";

// テスト前に、jest.mock() の第1引数にモジュール名を渡すことで、モジュール全体をモック化
jest.mock('axios')

test('should fetch all users',async () => {
  const users = [{ name: 'Bob' }]
  const resp = { data: users };

  (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(resp);
  // axios.get.mockImplementation(() => Promise.resolve(resp)) // 上記のmockResolvedValueと同じ設定
  await expect(Users.search()).resolves.toEqual(users);
})