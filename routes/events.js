const express = require('express'),
	{
		getAllEvent,
		createComments,
		getEventComment,
		createReply,
		getReplyComment,
		deleteComments,
		getEvent,
		getCategory,
		searchUser,
	} = require('../controller/event');

let router = express.Router();

router.get('/events', getAllEvent);

router.post('/event/comment', getEventComment);

router.post('/event/comment/create', createComments);

router.post('/event/reply/create', createReply);

router.post('/event/reply', getReplyComment);

router.post('/event/comment/delete', deleteComments);
router.get('/event/:category', getCategory);

router.post('/event/single', getEvent);
router.post('/user/search', searchUser);

module.exports = router;
