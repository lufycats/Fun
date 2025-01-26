const {
	forwardOrBroadCast,
	bot,
	parsedJid,
	getBuffer,
	genThumbnail,
} = require('../lib/')

const url1 = 'https://github.com/lufycats/Fun/blob/main/IMG_20250126_113111_237.jpg'

bot(
	{
		pattern: 'mforward2 ?(.*)',
		fromMe: true,
		desc: 'forward replied msg',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message)
			return await message.send('*Reply to a message*')
		if (!match)
			return await message.send(
				'*Give me a jid*\nExample .mforward2 jid1 jid2 jid3 jid4 ...'
			)
		const buff1 = await getBuffer(url1)
		const options = {}
		options.contextInfo = {
			forwardingScore: 5, // change it to 999 for many times forwarded
			isForwarded: true,
		}
		// ADDED /* TO REMOVE LINK PREVIEW TYPE
		options.linkPreview = {
			head: 'Sнᴀɴυкᴀ Lᴀкѕнᴀɴ ツ',
			body: '🥀',
			mediaType: 2, //3 for video
			thumbnail: buff1.buffer,
			sourceUrl: 'https://www.instagram.com/itzz_shanuk',
		}
		// ADDED */ TO REMOVE LINK PREVIEW TYPE

		options.quoted = {
			key: {
				fromMe: false,
				participant: '0@s.whatsapp.net',
				remoteJid: 'status@broadcast',
			},
			message: {
				imageMessage: {
					jpegThumbnail: await genThumbnail(buff1.buffer),
					caption: 'Heyo Whatsup? 🎃👻',
				},
			},
		}
		if (message.reply_message.audio) {
                        options.waveform = [90,60,88,45,0,0,0,45,88,28,9]
			options.duration = 999999
			options.ptt = true // delete this if not need audio as voice always
		}
		for (const jid of parsedJid(match))
			await forwardOrBroadCast(jid, message, options)
	}
)
