const eventModel = require('../models/event'),
	Ticket = require('../models/tickets'),
	Transaction = require('../models/transaction'),
	Organiser = require('../models/organisers');
// const organisers = require('../models/organisers');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	8,
);

exports.checkTicket = async (req, res) => {
	const { _id, event_id } = req.body;

	console.log('check', req.body);

	try {
		let ticket = await Ticket.findOne({
			user_id: _id,
			event_id: event_id,
			paid: true,
		}).lean();

		if (!ticket) {
			let event = await eventModel.findOne({ _id: event_id }).lean();
			let data = event.pricings.reduce((acc, cur) => {
				return [
					...acc,
					{
						...cur,
						ticketCount: 0,
						ticketAmount: 0,
					},
				];
			}, []);

			return res.status(200).json({
				success: true,
				count: 0,
				maxCount: 0,
				dummyCount: 0,
				_id: _id,
				event_id,
				tickets: data,
			});
		} else {
			let data = ticket.details.reduce((acc, cur) => {
				return [...acc, { ...cur, ticketCount: 0 }];
			}, []);

			return res.status(200).json({
				success: true,
				count: ticket.count,
				dummyCount: 0,
				_id: _id,
				event_id: event_id,
				tickets: data,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

exports.buyTicket = async (req, res) => {
	const {
		tickets,
		IP,
		device_fingerprint,
		flw_ref,
		modalauditid,
		paymentId,
		txRef,
	} = req.body;

	try {
		let ticket = await Ticket.findOne({
			user_id: tickets._id,
			event_id: tickets.event_id,
			paid: true,
		});

		if (ticket) {
			let newTransaction = new Transaction({
				ticket_id: ticket._id,
				tx_ref: txRef,
				flw_ref,
				paymentId,
				IP,
				modalauditid,
				device_fingerprint,
			});

			let tx = await newTransaction.save();

			ticket.transactions.push(tx._id);
			ticket.details = tickets.tickets;
			ticket.count = tickets.count;
			await ticket.save();

			return res.status(200).json({
				success: true,
			});
		} else {
			let tick = new Ticket({
				count: tickets.count,
				user_id: tickets._id,
				event_id: tickets.event_id,
				paid: true,
				transactions: [],
				details: tickets.tickets,
			});

			tick = await tick.save();

			let newTransaction = new Transaction({
				ticket_id: tick._id,
				tx_ref: txRef,
				flw_ref,
				paymentId,
				IP,
				modalauditid,
				device_fingerprint,
			});

			let tx = await newTransaction.save();
			tick.transactions.push(tx._id);

			await tick.save();

			return res.status(200).json({
				success: true,
			});
		}
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			success: false,
		});
	}
};

exports.getHistory = async (req, res) => {
	const { user_id } = req.body;

	try {
		let tickets = await Ticket.find({
			user_id: user_id,
			paid: true,
		}).lean();
		let resArr = [];

		if (tickets.length > 0) {
			tickets.forEach(async (element) => {
				let obj = {};
				let event = await eventModel
					.findOne({ _id: element.event_id })
					.select('-comments -pricings -sponsors -createdAt -updatedAt')
					.populate({
						path: 'organiser',
						model: Organiser,
						select: 'name',
					})

					.lean();
				let userTicket = [];

				element.details.forEach(async (el) => {
					let count = el.ticketCount;
					for (let i = 0; i < count; i++) {
						let obj2 = {};
						obj2.priceName = el.priceName;
						obj2.id = nanoid();
						userTicket.push(obj2);
					}
				});

				obj = { ...event, userTicket: userTicket };
				resArr.push(obj);
			});
			return res.status(200).json({
				success: true,
				data: resArr,
			});
		} else {
			return res.status(200).json({
				success: false,
			});
		}
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			success: false,
		});
	}
};
