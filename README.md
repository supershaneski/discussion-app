discussion-app
======

A sample React application built with Next.js 13 and powered by the OpenAI Chat API. 

# Description

This is a discussion app that allows you to explore various viewpoints on specific topics. Simply provide a topic, and it will generate multiple responses based on different perspectives, enabling you to learn and understand various views. You can customize the attributes of each point of view or character. 

Expand your knowledge and broaden your understanding of different perspectives in an intuitive and interactive manner.

# Setup

Clone the repository and install the dependencies

```sh
git clone https://github.com/supershaneski/discussion-app.git myproject

cd myproject

npm install
```

Copy `.env.example` and rename it to `.env` then edit the `OPENAI_APIKEY` and use your own `OpenAI API key`.

```javascript
OPENAI_APIKEY=YOUR_OWN_API_KEY
```

Then run the app

```sh
npm run dev
```

Open your browser to `http://localhost:3007/` to load the application page.

