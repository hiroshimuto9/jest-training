import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { screen, userEvent } from '@storybook/testing-library'

export default { component: Button } as Meta<typeof Button> // コンポーネントを指定
export const Primary: StoryObj<typeof Button> = {} // パラメータを設定
export const Secondary: StoryObj<typeof Button> = { args: { primary: false }} // primaryフラグにfalseを設定

export const ClickButton: StoryObj<typeof Button> = {
  play: () => {
    const button = screen.getByRole('button');
    userEvent.click(button)
  }
}