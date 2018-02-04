// slack script
// ============

const { WebClient } = require('@slack/client');

var sendNewScore = function (newScore) {
    // An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
    const token = process.env.BAKER_CAT_SLACK_TOKEN;

    const web = new WebClient(token);

    // The first argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
    const channelId = 'C6CNCLUA3';

    // format the new score into a message
    const message = `
    *_New score alert!_*
    ${newScore.name} (IP: ${newScore.publicIp})
    *${newScore.score} points!*
    ${new Date(newScore.date)}
    `;

    // See: https://api.slack.com/methods/chat.postMessage
    // I don't get why I need to specify the bot details manually
    web.chat.postMessage(channelId, message, {
        as_user: false,
        icon_emoji: ":cat:",
        username: "bakercat"
    })
        .then((res) => {
            // `res` contains information about the posted message
            console.log('Message sent: ', res.ts);
        })
        .catch(console.error);
};

// Export the function, so other files in our backend can use it
module.exports = sendNewScore;