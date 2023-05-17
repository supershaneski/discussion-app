import Header from './header'

export default {
  title: 'MyApp/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    onRefresh: { action: 'onRefresh' },
    onSettings: { action: 'onSettings' },
    /*backgroundColor: {
      control: 'color',
    },*/
  },
}

export const Primary = {
  args: {
    title: 'Lorem ipsum dolor',
    disabled: false,
  },
};

/*
const Template = (args) => <Dialog {...args} />

export const Primary = Template.bind({})
Primary.args = {
  caption: 'Hello world',
};
*/