const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const toPhoneNumber = process.env.TO_PHONE_NUMBER;
const fromPhoneNumber = process.env.FROM_PHONE_NUMBER;

const client = require("twilio")(accountSid, authToken);

const bins = ["Grey", "Green/Brown", "Blue"];
const startDate = new Date("2024-10-01");

function getNextBin() {
  const now = new Date();
  const weeksPassed = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000));
  const binIndex = weeksPassed % bins.length;
  return bins[binIndex];
}

function sendReminder(bin) {
  client.messages
    .create({
      body: `Reminder: Put out the ${bin} bin tonight!`,
      to: toPhoneNumber,
      from: fromPhoneNumber,
    })
    .then((message) => console.log(`Reminder sent: ${message.sid}`))
    .catch((err) => {
      console.error(err);
      throw new Error("Something broke! See logs for details.");
    });
}

const binToCollect = getNextBin();
sendReminder(binToCollect);
