import { IncomingWebhook } from "@slack/webhook";
import { SlackMessage } from "./slackMessage";

/**
 * Represents a Slack channel.
 */
export class SlackChannel {
  private webhook: IncomingWebhook;

  /**
   * Creates a new SlackChannel with a given webhook url.
   * @param webhookUrl the url for the webhook.
   */
  constructor(webhookUrl: string) {
    this.webhook = new IncomingWebhook(webhookUrl);
  }

  /**
   * Sends a SlackMessage to the channel.
   * @param message the SlackMessage to send.
   */
  async send(message: SlackMessage): Promise<void> {
    await this.webhook.send(message.get());
  }
}
