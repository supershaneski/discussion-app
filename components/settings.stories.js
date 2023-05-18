import Settings from './settings'

export default {
  title: 'MyApp/Settings',
  component: Settings,
  tags: ['autodocs'],
  argTypes: {
    onConfirm: { action: 'onConfirm' },
    onClose: { action: 'onClose' },
  },
}

const Template = (args) => <Settings {...args} />

export const Title = Template.bind({})

Title.args = {
  title: 'Settings',
  caption: 'Lorem ipsum dolor sit amet sequi velit qui natus.',
}

export const NoTitle = Template.bind({})

NoTitle.args = {
  caption: 'Lorem ipsum dolor sit amet sequi velit qui natus.',
};