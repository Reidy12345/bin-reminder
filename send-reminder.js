const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Twilio Auth Token
const client = require("twilio")(accountSid, authToken);

// Bin schedule
const bins = ["Grey", "Blue", "Green"];
const startDate = new Date("2024-01-01"); // Known starting date (adjust as needed)

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
      to: "+1234567890", // Your phone number
      from: "+1987654321", // Your Twilio number
    })
    .then((message) => console.log(`Reminder sent: ${message.sid}`))
    .catch((err) => console.error(err));
}

const binToCollect = getNextBin();
sendReminder(binToCollect);
