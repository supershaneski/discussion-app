import InputMessage from './inputmessage'

export default {
  title: 'MyApp/InputMessage',
  component: InputMessage,
  tags: ['autodocs'],
  argTypes: {
    setInputText: { action: 'setInputText' },
    onSubmit: { action: 'onSubmit' },
  },
}

export const Primary = {
  args: {
    loading: false,
    inputText: 'Lorem ipsum dolor amet sit',
  },
}

export const Loading = {
  args: {
    loading: true,
    inputText: 'Lorem ipsum dolor amet sit',
  },
}