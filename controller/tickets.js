const eventModel = require("../models/event"),
  Organiser = require("../models/organisers"),
  User = require("../models/user"),
  Ticket = require("../models/tickets");

exports.buyTicket = async (req, res) => {
  const { _id, event_id, maxCount, ticketArrayList, dummyCount } = req.body;

  let ticket = await Ticket.findOne({
    user_id: _id,
    event_id: event_id,
    paid: true
  });

  let event = await eventModel.findOne({ _id: event_id }).lean();
  console.log(1, event);
  console.log(2, event.pricings);
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

  console.log(data);

  if (!ticket) {
    return res.status(200).json({
      success: true,
      data: {
        count: 0,
        dummyCount: 0,
        _id: _id,
        event_id,
        tickets: data
      }
    });
  }
};
