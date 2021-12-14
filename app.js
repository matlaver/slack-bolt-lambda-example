const { App, AwsLambdaReceiver } = require('@slack/bolt');

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
  processBeforeResponse: true
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

// Listens for an action from a button click
app.action('button_click', async ({ body, ack, say }) => {
  await say(`<@${body.user.id}> clicked the button`);
  await ack();
});

app.command('/echo', async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();

  await respond(`${command.text}`);
});

app.command('/yum',  async ({ ack, body, client }) => {
  // Acknowledge the command request
  await ack();

 try {
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Modal title'
        },
        "blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hello, Builders Experience TFC, we would like to invite you to dinner tonight.\n\n *Please select a restaurant:*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
			},
			"accessory": {
				"type": "image",
				"image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
			},
			"accessory": {
				"type": "image",
				"image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
			},
			"accessory": {
				"type": "image",
				"image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg",
				"alt_text": "alt text for image"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Farmhouse",
						"emoji": true
					},
					"value": "click_me_123"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Kin Khao",
						"emoji": true
					},
					"value": "click_me_123",
					"url": "https://google.com"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Ler Ros",
						"emoji": true
					},
					"value": "click_me_123",
					"url": "https://google.com"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "This is a plain text section block.",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "This is a plain text section block.",
				"emoji": true
			}
		}
	],submit: {
          type: 'plain_text',
          text: 'Submit'
        }
      }
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.command('/ticket', async ({ ack, body, client }) => {
  // Acknowledge the command request
  await ack();

  try {
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Modal title'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Welcome to a modal with _blocks_'
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Click me!'
              },
              action_id: 'button_abc'
            }
          },
          {
            type: 'input',
            block_id: 'input_c',
            label: {
              type: 'plain_text',
              text: 'What are your hopes and dreams?'
            },
            element: {
              type: 'plain_text_input',
              action_id: 'dreamy_input',
              multiline: true
            }
          }
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit'
        }
      }
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.message('goodbye', async ({ message, say }) => {
  await say(`See ya later, <@${message.user}> :wave:`);
});

module.exports.handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
}
