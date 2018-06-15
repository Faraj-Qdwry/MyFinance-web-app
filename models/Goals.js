var mongoose = require('mongoose');

// User Schema
var GoalSchema = mongoose.Schema({
    goal: {
        type: String,
        index: true
    },
    checked: {
        type: Boolean
    }
});

var Goal = module.exports = mongoose.model('Goal', GoalSchema);

module.exports.createGoal = function (newGoal, callback) {
    Goal.create(newGoal);
};

module.exports.removeGoal = function (id, callback) {
    var myquery = {_id: id};
    Goal.deleteOne(myquery, callback);
};

module.exports.findAllGoals = function (newGoal, callback) {
    var query = {};
    Goal.find(query, callback);
};