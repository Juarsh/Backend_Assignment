const { reportModel } = require("../models");

const getReportsController = async (req, res) => {
  const reportID = req.query.reportID;
  const reportData = await reportModel.findById(reportID).exec();
  if (reportData) {
    res.send(reportData);
  }
};
module.exports = getReportsController;
