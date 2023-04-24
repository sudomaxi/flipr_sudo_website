const Task = require("../models/podcast.model");
const db = require("../models/index");

exports.addTaskForEmployee = async (employeeId, task) => {
  await db.task.create(task).then((docTask) => {
    console.log("Created task", docTask);
    return db.user.findByIdAndUpdate(
      employeeId,
      { $push: { tasks: docTask._id } },
      { new: true, useFindAndModify: false }
    );
  });
};

exports.getEmployeeWithPopulate = (id) => {
  return db.task.findById(id).populate("tasks");
};
