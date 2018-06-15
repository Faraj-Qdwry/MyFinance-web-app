var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var Goal = require('../models/Goals');
var Daily = require('../models/Daily');

// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
    res.render('index');
});

// post comments
router.post('/', ensureAuthenticated, function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var comm = req.body.comm;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('comm', 'Comment is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('index', {
            errors: errors
        });
    } else {
        var newComment = new Comment({
            name: name,
            email: email,
            comment: comm
        });
        Comment.createComment(newComment, function (err, user) {
            if (err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'Your comment hase been added successfully');
        res.render('index');
    }
});

// Get Goals
router.get('/Goals', ensureAuthenticated, function (req, res) {
    Goal.findAllGoals({}, function (err, user) {
        if (err) throw err;
        //console.log(user);
        res.render('Goals', {goals: user});
    });
});


router.post('/Goals', ensureAuthenticated, function (req, res) {
    var goal = req.body.goal;
    req.checkBody('goal', 'Goal is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('Goals', {
            errors: errors
        });
    } else {
        var newGoal = new Goal({
            goal: goal,
            checked: false
        });
        Goal.createGoal(newGoal, function (err, user) {
            if (err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'Your goal hase been added successfully');
        res.redirect('/');
    }
});

router.post('/Goals/delete', ensureAuthenticated, function (req, res) {
    var goal = req.body.p;

    Goal.removeGoal(goal, function (err, user) {
        if (err) throw err;
        console.log(user);
    });
    req.flash('success_msg', 'Your goal hase been Removed successfully');
    res.redirect('/');
});

router.post('/DailyExpenses/delete', ensureAuthenticated, function (req, res) {
    var day = req.body.p;

    Daily.removeDaily(day, function (err, user) {
        if (err) throw err;
        console.log(user);
    });
    req.flash('success_msg', 'Your dayly hase been Removed successfully');
    res.redirect('/');
});

// Get DailyExpenses
router.get('/DailyExpenses', ensureAuthenticated, function (req, res) {
    Daily.findAllDailies({}, function (err, user) {
        if (err) throw err;
        //console.log(user);
        res.render('DailyExpenses', {daily: user});
    });
    //res.render('DailyExpenses');
});

router.post('/DailyExpenses/DailyExpenses', ensureAuthenticated, function (req, res) {
    var itemName1 = req.body.item_name;
    var category1 = req.body.category;
    var amount1 = req.body.amount;
    var data1 = "("+(req.body.date).toString()+")";
    var budget1 = req.body.budget;

    console.log(data1);

    if (itemName1.isEmpty || category1.isEmpty || amount1.isEmpty) {
        res.render('DailyExpenses', {
            errors: errors
        });
    } else {
        // if (amount > budget) {
        //     //prompt("you can not spend more than what you earn monthly");
        //     req.flash('error_msg', 'you can not spend more than what you earn monthly');
        //     res.render('DailyExpenses')
        // }

        var newDaily = new Daily({
            itemName: itemName1,
            category: category1,
            date: data1,
            amount: amount1
        });

        Daily.createDaily(newDaily, function (err, user) {
            if (err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'Your newDaily has been added successfully');
        res.redirect('/');
    }
});


// Get MonthlyExpenses
router.get('/MonthlyExpenses', ensureAuthenticated, function (req, res) {
    res.render('MonthlyExpenses');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;