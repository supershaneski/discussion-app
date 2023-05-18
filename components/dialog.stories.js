import Dialog from './dialog'

export default {
  title: 'MyApp/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    onConfirm: { action: 'onConfirm' },
    onClose: { action: 'onClose' },
  },
}

const Template = (args) => <Dialog {...args} />

export const Title = Template.bind({})

Title.args = {
  title: 'Dialog Title',
  caption: 'Lorem ipsum dolor sit amet sequi velit qui natus.',
}

export const NoTitle = Template.bind({})

NoTitle.args = {
  caption: 'Lorem ipsum dolor sit amet sequi velit qui natus.',
};