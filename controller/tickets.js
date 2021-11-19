const eventModel = require("../models/event"),
  Ticket = require("../models/tickets"),
  Transaction = require("../models/transaction");

exports.checkTicket = async (req, res) => {
  const { _id, event_id } = req.body;

  console.log(req.body);

  try {
    let ticket = await Ticket.findOne({
      user_id: _id,
      event_id: event_id,
      paid: true
    }).lean();

    console.log(ticket);

    if (!ticket) {
      let event = await eventModel.findOne({ _id: event_id }).lean();
      let data = event.pricings.reduce((acc, cur) => {
        return [
          ...acc,
          {
            ...cur,
            ticketCount: 0,
            ticketAmount: 0
          }
        ];
      }, []);

      return res.status(200).json({
        success: true,
        count: 0,
        maxCount: 0,
        dummyCount: 0,
        _id: _id,
        event_id,
        tickets: data
      });
    } else {
      let res = ticket.details.reduce((acc, cur) => {
        return [
          ...acc,
          {
            ...cur,
            ticketCount: 0
          }
        ];
      }, []);

      return res.status(200).json({
        success: true,
        count: 0,
        dummyCount: 0,
        _id: _id,
        event_id: event_id,
        tickets: res
      });
    }
  } catch (error) {}
};

exports.buyTicket = async (req, res) => {
  const {
    count,
    tickets,
    IP,
    device_fingerprint,
    flw_ref,
    modalauditid,
    paymentId,
    txRef
  } = req.body;
  console.log(req.body);

  try {
    let ticket = await Ticket.findOne({
      user_id: tickets._id,
      event_id: tickets.event_id,
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
        tx_ref: txRef,
        flw_ref,
        paymentId,
        IP,
        modalauditid,
        device_fingerprint
      });

      let tx = await newTransaction.save();

      ticket = await Ticket.findOne({
        user_id: tickets._id,
        event_id: tickets.event_id,
        paid: true
      });

      ticket.transactions.push(tx._id);
      await ticket.save();

      return res.status(200).json({
        success: true
      });
    } else {
      let eventnew = await eventModel.findOne({ _id: tickets.event_id }).lean();
      console.log(eventnew);
      let data = eventnew.pricings.reduce((acc, cur) => {
        return [
          ...acc,
          {
            ...cur,
            num: 0,
            ticketAmount: 0
          }
        ];
      }, []);

      console.log(data);

      data.map(element => {
        return tickets.tickets.map(ele => {
          if (element.type == ele.ticketTitle) {
            return (element.num =
              Number(element.num) + Number(ele.ticketCount));
          }
        });
      });

      let tick = new Ticket({
        user_id: tickets._id,
        event_id: tickets.event_id,
        maxCount: count,
        paid: true,
        transactions: [],
        details: data
      });

      tick = await tick.save();

      let newTransaction = new Transaction({
        ticket_id: tick._id,
        tx_ref: txRef,
        flw_ref,
        paymentId,
        IP,
        modalauditid,
        device_fingerprint
      });

      let tx = await newTransaction.save();
      tick.transactions.push(tx._id);

      await tick.save();

      return res.status(200).json({
        success: true
      });
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      success: false
    });
  }
};
