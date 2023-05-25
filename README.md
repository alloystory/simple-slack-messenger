# Simple Slack Messenger

This package allows users to quickly send simple Slack messages involving only text, tags, images and links.
For more complex message layouts, please look at [slack-block-builder](https://www.npmjs.com/package/slack-block-builder) instead.

## How to get webhook URL?

Follow the instructions on https://api.slack.com/messaging/webhooks to get a webhook URL for your bot.

## Usage

```js
const {
  SlackMessage,
  SlackChannel,
  SlackMrkdwn,
} = require("simple-slack-messenger");

const channel = new SlackChannel("your_webhook_url");
const message = SlackMessage.create()
  .insertHeader("This is a header")
  .insertDivider()
  .insertImage("https://picsum.photos/200/300", "this is a test image")
  .insertMrkdwnText(
    SlackMrkdwn.create()
      .tagUser("your_user_id")
      .appendText(" This is a sample message. ")
      .appendNewLine()
      .appendText("Please look at ")
      .tagChannel("your_channel_id")
      .appendText(" this channel. ")
      .appendText("Also please look at ")
      .appendLink("https://jsonplaceholder.typicode.com/posts/1", "this link")
      .appendText(" for some json code.")
  );

channel
  .send(message)
  .then((r) => console.log(r))
  .catch((e) => console.error(e));
```
