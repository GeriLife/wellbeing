import { Email } from "meteor/email";
function isAlreadyVerified(_id) {
  let user = Meteor.users.findOne(_id);
  if (!!user) {
    return (
      user.emails.length > 0 &&
      user.emails[0].verified === true &&
      !!user.services.password
    );
  }
  throw "User not found!";
}

Meteor.methods({
  sendEnrollmentEmail({ to, subject, text }) {
    const isVerified = isAlreadyVerified(to);
    if (isVerified) throw "User already verified!";
    let invite = Invitations.findOne({ userId: to });

    if (!invite) {
      invite = Invitations.insert({ userId: to });

      console.log("if !invite", invite, to);
      const meteorUser = Meteor.users.findOne({ _id: to });
      const emailAddress = !!meteorUser ? meteorUser.emails[0].address : "";

      if (!emailAddress) throw "No valid email linked to the user!";

      const url = `${process.env.BASE_URL}/invitation/${invite}`;
      const message = `${text} \n\n ${url}`;
      Email.send({
        to: emailAddress,
        from: process.env.FROM_EMAIL,
        subject,
        text: message
      });
    }
  },
  ValidateAndRedeem(_id) {
    console.log(_id);
    const invite = Invitations.findOne({ _id });

    if (!invite) {
      /* Todo: add localization */
      return { error: { message: "Valid invite not Found!" } };
    }
    const user = invite.user();
    console.log(invite,user)
    const isUserValid = !!user && user.emails.length > 0;
    if (!isUserValid) return { error: { message: "Valid user not found!" } };
    const isEmailVerified = user.emails[0].verified === true;
    if (isEmailVerified)
      return { error: { message: "User Already verified!" } };
    else {
      Meteor.users.update(
        { _id: invite.userId },
        { $set: { "emails.0.verified": true } }
      );
      return {
        isValid: true,
        message: "User redeemed!"
      };
    }
  }
});
