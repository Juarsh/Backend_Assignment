const { reportModel } = require("../models");
const { calculateMean, convertToBasePrice } = require("../utils");

const postReportsController = async (req, res) => {
  const { reportDetails } = req.body;

  const reportData = await reportModel
    .findOne({
      marketID: reportDetails.marketID,
      cmdtyID: reportDetails.cmdtyID,
    })
    .exec();

  if (reportData) {
    reportData.price = calculateMean(
      convertToBasePrice(reportDetails.price, reportDetails.convFctr),
      reportData.price
    );

    reportData.users.push(reportDetails.userID);

    reportData.save(function (err) {
      if (err) return handleError(err);
      res.send({
        status: "success",
        reportID: reportData._id,
      });
    });
  } 
  else {
    const userArray = [];

    userArray.push(reportDetails.userID);

    const newReportData = {
      cmdtyName: reportDetails.cmdtyName,
      cmdtyID: reportDetails.cmdtyID,
      marketName: reportDetails.marketName,
      marketID: reportDetails.marketID,
      priceUnit: "Kg",
      price: convertToBasePrice(reportDetails.price, reportDetails.convFctr),
      users: userArray,
    };

    const report = new reportModel(newReportData);
    
    report.save(function (err) {
      if (err) return handleError(err);
      res.send({
        status: "success",
        reportID: report._id,
      });
    });
  }
};
module.exports = postReportsController;
