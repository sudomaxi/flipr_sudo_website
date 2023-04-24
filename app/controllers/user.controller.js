const db = require("../models");
const User = require("../models/user.model");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.employeeBoard = (req, res) => {
    res.status(200).send("Employee Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.updateUser = (req, res) => {
    db.user.findByIdAndUpdate(req.params.id, req.body).then(() => {
        db.user.findById(req.params.id).then((user) => {
            res.status(200).send(user);
        });
    }).catch(err => {
        res.status(500).send({message: err.message, result: err.name});
    });
}

exports.getAllUsers = (req, res) => {
    db.user.find().then((employees) => {
        res.status(200).send({employees: employees});
    }).catch(err => {
        res.status(500).send({result: err.name, message: err.message});
    })
}

exports.deleteUser = (req, res) => {
    db.user.findByIdAndDelete({_id: Object(req.params.id)}).then(() => {
        db.task.deleteMany({employee: req.params.id}).then(() => {
            res.status(200).send({result: "Employee removed Successfully"});
        });
    }).catch(err => {
        res.status(500).send({result: err.name, message: err.message});
    });
}