/**
 * Creates a Slack mrkdwn message that can be built via method chaining.
 */
export class SlackMrkdwn {
  private text: string;

  private constructor(text: string) {
    this.text = text;
  }

  /**
   * Creates an empty SlackMrkdwn.
   * @returns the created SlackMrkdwn.
   */
  static create() {
    return new SlackMrkdwn("");
  }

  /**
   * Appends text to the mrkdwn message.
   * @param text the text to add.
   * @returns a new SlackMrkdwn with the appended text.
   */
  appendText(text: string): SlackMrkdwn {
    return new SlackMrkdwn(`${this.text}${text}`);
  }

  /**
   * Appends a link to the mrkdwn message.
   * @param link the link to add.
   * @param altText an alt text for the link.
   * @returns a new SlackMrkdwn with the appended link.
   */
  appendLink(link: string, altText: string | null): SlackMrkdwn {
    return altText
      ? new SlackMrkdwn(`${this.text}<${link}|${altText}>`)
      : new SlackMrkdwn(`${this.text}${link}`);
  }

  /**
   * Appends a new line to the mrkdwn message.
   * @returns a new SlackMrkdwn with a new line.
   */
  appendNewLine(): SlackMrkdwn {
    return new SlackMrkdwn(`${this.text}\n`);
  }

  /**
   * Appends a channel tag to the mrkdwn message.
   * @param channelId the id of the channel.
   * @returns a new SlackMrkdwn with the tagged channel.
   */
  tagChannel(channelId: string): SlackMrkdwn {
    return new SlackMrkdwn(`${this.text}<#${channelId}>`);
  }

  /**
   * Appends a user tag to the mrkdwn message.
   * @param userId the id of the user.
   * @returns a new SlackMrkdwn with the tagged user.
   */
  tagUser(userId: string): SlackMrkdwn {
    return new SlackMrkdwn(`${this.text}<@${userId}>`);
  }

  /**
   * Appends a group tag to the mrkdwn message.
   * @param groupId the id of the group.
   * @returns a new SlackMrkdwn with the tagged group.
   */
  tagGroup(groupId: string): SlackMrkdwn {
    return new SlackMrkdwn(`${this.text}<!subteam^${groupId}>`);
  }

  /**
   * Gets the built mrkdwn text.
   * @returns the built mrkdwn text.
   */
  get(): string {
    return this.text;
  }
}
