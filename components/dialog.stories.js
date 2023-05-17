import Dialog from './dialog'

export default {
  title: 'MyApp/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    onConfirm: { action: 'onConfirm' },
    onClose: { action: 'onClose' },
    backgroundColor: {
      control: 'color',
    },
  },
}

/*
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};
*/

const Template = (args) => <Dialog {...args} />

export const Primary = Template.bind({})
Primary.args = {
  caption: 'Hello world',
};