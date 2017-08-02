const express = require('express');
const authRouter = express.Router();
const passport = require('../services/local');
const authHelpers = require('../services/auth-helpers');
const usersController = require('../controllers/users.controllers');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
        res.render('auth/login', {
        currentPage: 'login',
    });
});

authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
        res.render('auth/register', {
        currentPage: 'register',
    });
});

authRouter.post('/register', usersController.create);

authRouter.post('/login', passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: 'auth/login',
        failureFlash: true,
    })
);

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;