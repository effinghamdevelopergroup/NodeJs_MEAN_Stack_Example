var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/TestData');

// create GameData schema
var testDataSchema = new Schema({
    Id: { type: String, required: true },
    Date: { type: String, required: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
}, { collection: 'TestData' });
testDataSchema.set('collection', 'TestData');
var TestData = mongoose.model('TestData', testDataSchema);

// Create test data
module.exports.CreateTestData = function (req, res) {
    var obj = new TestData(req.body);
    obj.save(function (err, result) {
        res.json(result);

    }, function(err) {
    });
}

// Get test data
module.exports.GetTestData = function (req, res) {
    try {
        TestData.find(function (err, results) {
            if (results.length > 0)
                res.json({ list: results });
            else
                res.json({ list: [], Message: 'Zero records' });
        });
    }
    catch (err) {
        res.json({ list: [], Message: 'Zero records - ERROR' });
    }
}

// Delete test records
module.exports.DeleteTestData = function (req, res) {
    var id = req.params.id;
    TestData.remove({ _id: id }, function (err, removed) {
        res.json(removed);
    });

}

// Update test records
module.exports.UpdateTestData = function (req, res) {

    var id = req.body.id;
    TestData.findById(id, function (err, obj) {
        if (err) return res.json({ "IsSuccess": "Error" }); //handleError(err); 
        obj.link = req.body.link;
        obj.value = req.body.value;
        obj.save(function (err, updatedTank) {
            if (err) return res.json({ "IsSuccess": "Error" });//handleError(err);
            res.json(updatedTank);
        });
    });

}