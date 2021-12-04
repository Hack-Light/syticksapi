const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	ticket_slug: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ticket',
	},

	event_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'event',
	},
});

module.exports = mongoose.model('share', shareSchema);
