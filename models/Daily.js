var mongoose = require('mongoose');

// User Schema
var DailySchema = mongoose.Schema({
    itemName: {
        type: String,
        index: true
    },
    category: {
        type: String
    },
    data : {
        type : String
    },
    amount: {
        type: Number
    }
});

var Daily = module.exports = mongoose.model('Daily', DailySchema);

module.exports.createDaily = function (newDaily, callback) {
    Daily.create(newDaily);
};

module.exports.removeDaily = function (id, callback) {
    var myquery = {_id: id};
    Daily.deleteOne(myquery, callback);
};

module.exports.findAllDailies = function (newDaily, callback) {
    var query = {};
    Daily.find(query, callback);
};