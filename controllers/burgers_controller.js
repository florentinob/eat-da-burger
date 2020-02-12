var express = require("express");
var burgers = require("../models/burger");
var router = express.Router();

router.get("/", function(req, res) {
    res.redirect("burgers")
});

router.get("/burgers", function(req, res) {
    burgers.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/burgers/create", function(req, res) {
    burgers.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(result) {
        res.json({ id: result.insertId });   
    });
});

router.put("/burgers/update/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burgers.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.redirect("/burgers");
        }
    });
});

module.exports = router;


