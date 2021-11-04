const eventModel = require("../models/event"),
  Ticket = require("../models/tickets"),
  Transaction = require("../models/transaction");

exports.checkTicket = async (req, res) => {
  const { _id, event_id } = req.body;

  try {
    let ticket = await Ticket.findOne({
      user_id: _id,
      event_id: event_id,
      paid: true
    });

    console.log(ticket);

    if (!ticket) {
      let event = await eventModel.findOne({ _id: event_id }).lean();
      let data = event.pricings.reduce((acc, cur) => {
        return [
          ...acc,
          {
            ...cur,
            ticketCount: 0,
            ticketAmount: 0,
            dummyCount: 0
          }
        ];
      }, []);

      return res.status(200).json({
        success: true,
        count: 0,
        dummyCount: 0,
        _id: _id,
        event_id,
        tickets: data
      });
    }
  } catch (error) {}
};

exports.buyTicket = async (req, res) => {
  const { _id, event_id, maxCount, tickets, dummyCount } = req.body;

  try {
    let ticket = await Ticket.findOne({
      user_id: _id,
      event_id: event_id,
      paid: true
    }).lean();

    if (ticket) {
      ticket.details.map(element => {
        return tickets.tickets.map(ele => {
          if (element.type == ele.ticketTitle) {
            return (element.num =
              Number(element.num) + Number(ele.ticketCount));
          }
        });
      });

      let newTransaction = new Transaction({
        ticket_id: ticket._id,
        tx_ref,
        flw_ref,
        paymentId,
        IP,
        modalauditid,
        device_fingerprint
      });

      let tx = await newTransaction.save();

      ticket.transactions.push(tx._id);
      ticket.save();

      return res.status(200).json({
        success: true
      });
    } else {
      let event = await eventModel.findOne({ _id: event_id }).lean();
      let data = event.pricings.reduce((acc, cur) => {
        return [
          ...acc,
          {
            ...cur,
            num: 0,
            ticketAmount: 0
          }
        ];
      }, []);

      data.map(element => {
        return tickets.tickets.map(ele => {
          if (element.type == ele.ticketTitle) {
            return (element.num =
              Number(element.num) + Number(ele.ticketCount));
          }
        });
      });

      let newTransaction = new Transaction({
        ticket_id: ticket._id,
        tx_ref,
        flw_ref,
        paymentId,
        IP,
        modalauditid,
        device_fingerprint
      });

      let tx = await newTransaction.save();

      let tick = new Ticket({
        user_id: _id,
        event_id: event_id,
        maxCount: maxCount,
        paid: true,
        transactions: [tx._id],
        details: data
      });

      tick.save();

      return res.status(200).json({
        success: true
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false
    });
  }
};
