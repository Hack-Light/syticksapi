const eventModel = require("../models/event"),
  Organiser = require("../models/organisers"),
  User = require("../models/user"),
  Ticket = require("../models/tickets");

export const buyTicket = async (req, res) => {
  const { _id, event_id, maxCount, ticketArrayList, dummyCount } = req.body;

  let ticket = await Ticket.findOne({
    user_id: _id,
    event_id: event_id,
    paid: true
  });

  let event = await eventModel.findOne({ _id: event_id });

  let data = event.pricings.reduce((acc, cur) => {
    return [
      ...acc,
      {
        ...cur,
        ticketCount: 0,
        ticketPrice: 0
      }
    ];
  }, []);

  if (!ticket) {
    return res.status(500).json({
      success: true,
      data: {
        maxCount: 0,
        dummyCount: 0,
        user_id,
        event_id,
        tickets: data
      }
    });
  }
};
