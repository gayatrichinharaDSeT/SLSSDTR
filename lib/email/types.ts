export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  // Lets a notification email's recipient (SLSSDTR staff) reply straight to
  // the person who submitted the form, without exposing that address as
  // the actual sender.
  replyTo?: string;
};

export type EmailProvider = {
  name: string;
  send(message: EmailMessage): Promise<void>;
};
