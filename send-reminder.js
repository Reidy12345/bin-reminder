const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Twilio Auth Token
const client = require("twilio")(accountSid, authToken);

// Phone numbers from environment variables
const toPhoneNumber = process.env.TO_PHONE_NUMBER; // Your phone number
const fromPhoneNumber = process.env.FROM_PHONE_NUMBER; // Twilio phone number

// Bin schedule
const bins = ["Grey", "Blue", "Green"];
const startDate = new Date("2024-10-01"); // Known starting date (adjust as needed)

function getNextBin() {
  const now = new Date();
  const weeksPassed = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000));
  const binIndex = weeksPassed % bins.length;
  return bins[binIndex];
}

// Send SMS reminder
function sendReminder(bin) {
  client.messages
    .create({
      body: `Reminder: Put out the ${bin} bin tonight!`,
      to: toPhoneNumber, // Your phone number from environment variable
      from: fromPhoneNumber, // Twilio number from environment variable
    })
    .then((message) => console.log(`Reminder sent: ${message.sid}`))
    .catch((err) => console.error(err));
}

const binToCollect = getNextBin();
sendReminder(binToCollect);
