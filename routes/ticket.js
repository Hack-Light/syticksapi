const express = require('express'),
	{
		checkTicket,
		buyTicket,
		getHistory,
		/*  getAllEvent,
    createComments,
    getEventComment,
    createReply, */
		// getReplyComment,
		// deleteComments
	} = require('../controller/tickets');

let router = express.Router();

router.post('/ticket/enquire', checkTicket);

router.post('/ticket/create', buyTicket);

router.post('/ticket/history', getHistory);

module.exports = router;
