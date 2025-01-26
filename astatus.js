const { bot, forwardOrBroadCast } = require('../lib')

// bot(
// 	{
// 		pattern: 'astatus ?(.*)',
// 		fromMe: true,
// 		desc: 'msg',
// 		type: 'whatsapp',
// 	},
// 	async (message, match) => {}
// )

const possibleReplies = 'send,ewanna,evanna,danna,dnn,dhm,dko,එවන්න,දාන්න,එවන්නකෝ,දාන්නකෝ,එවහම්,ewahan,dako,දාකෝ'

bot({ on: 'text', fromMe: false, type: 'astatus' }, async (message, match) => {
	if (
		message.reply_message &&
		message.reply_message.key.remoteJid == 'status@broadcast' &&
		!message.isGroup
	) {
		for (const reply of possibleReplies.split(',')) {
			if (new RegExp(reply, 'i').test(message.text)) {
				return await forwardOrBroadCast(message.jid, message, {
					quoted: message.data,
				})
			}
		}
	}
})
