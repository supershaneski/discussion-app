import MessageList from './messagelist'

export default {
  title: 'MyApp/MessageList',
  component: MessageList,
  tags: ['autodocs'],
  argTypes: {},
}

export const Primary = {
  args: {
    items: [
      { role: 'user', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore.' },
      { role: 'assistant', content: `Person1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore.
        Person2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore.` },
    ],
    loading: false,
  },
}