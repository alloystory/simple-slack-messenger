import { IncomingWebhookSendArguments } from "@slack/webhook";
import { SlackMrkdwn } from "./slackMrkdwn";

type SlackMessageData = Required<
  Pick<IncomingWebhookSendArguments, "blocks" | "unfurl_links" | "unfurl_media">
>;

/**
 * Creates a Slack message that can be built via method chaining.
 */
export class SlackMessage {
  private message: SlackMessageData;

  private constructor(message: SlackMessageData) {
    this.message = message;
  }

  /**
   * Creates an empty SlackMessage.
   * @returns the created SlackMessage.
   */
  static create() {
    return new SlackMessage({
      blocks: [],
      unfurl_links: false,
      unfurl_media: false,
    });
  }

  /**
   * Inserts a header.
   * @param text the header text to insert.
   * @returns a new message with the header appended.
   */
  insertHeader(text: string): SlackMessage {
    const block = {
      type: "header",
      text: { type: "plain_text", text },
    };
    return new SlackMessage({
      ...this.message,
      blocks: [...this.message.blocks, block],
    });
  }

  /**
   * Inserts Slack's mrkdwn text.
   * @see {@link https://api.slack.com/reference/surfaces/formatting} for syntax information.
   * @param text the text to add.
   * @returns a new message with the text appended.
   */
  insertMrkdwnText(text: SlackMrkdwn | string): SlackMessage {
    const block = {
      type: "section",
      text: {
        type: "mrkdwn",
        text: text instanceof SlackMrkdwn ? text.get() : text,
      },
    };
    return new SlackMessage({
      ...this.message,
      blocks: [...this.message.blocks, block],
    });
  }

  /**
   * Inserts a divider.
   * @returns a new message with the divider appended.
   */
  insertDivider(): SlackMessage {
    const block = { type: "divider" };
    return new SlackMessage({
      ...this.message,
      blocks: [...this.message.blocks, block],
    });
  }

  /**
   * Inserts an image.
   * @param imageUrl the image url to insert.
   * @param altText the alt text for the image.
   * @returns a new message with the image appended.
   */
  insertImage(imageUrl: string, altText: string | null): SlackMessage {
    const block = {
      type: "image",
      image_url: imageUrl,
      alt_text: altText ?? "default alt text",
    };
    return new SlackMessage({
      ...this.message,
      blocks: [...this.message.blocks, block],
    });
  }

  /**
   * Allows links to be unfurled in the Slack message.
   * @returns a new message with link unfurling enabled.
   */
  unfurlLinks(): SlackMessage {
    return new SlackMessage({
      ...this.message,
      unfurl_links: true,
    });
  }

  /**
   * Allows media to be unfurled in the Slack message.
   * @returns a new message with media unfurling enabled.
   */
  unfurlMedia(): SlackMessage {
    return new SlackMessage({
      ...this.message,
      unfurl_media: true,
    });
  }

  /**
   * Gets a Slack-compatible message to be sent.
   * @returns the slack message to be sent.
   */
  get(): IncomingWebhookSendArguments {
    return this.message;
  }
}
