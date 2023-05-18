import Banner from './banner'

export default {
  title: 'MyApp/Banner',
  component: Banner,
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
}

export const Disabled = {
  args: {
    title: 'Lorem ipsum dolor',
    disabled: true,
  },
}

/*
const Template = (args) => <Dialog {...args} />

export const Primary = Template.bind({})
Primary.args = {
  caption: 'Hello world',
};
*/