const Event = require('../db/models/events');

const eventController = {};

//find all events
eventController.index = (req, res) => {
    Event.findAll().then(events => {
        res.render('events/event-index', {
            currentPage: 'index',
            message: 'ok',
            data: events,
        });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

//find single events
eventController.show = (req, res) => {
    Event.findById(req.params.id)
    .then(events => {
        res.render('events/event-single', {
            message: 'ok',
            data: events,
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

//add event
eventController.create = (req, res) => {
    Event.create({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        description: req.body.description,
        organizer: req.body.organizer,
        user_id: process.env.CURRENT_USER,
    }).then(() => {
        res.redirect('events')
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports = eventController;