const { reportModel } = require("../models");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Report", () => {
  beforeEach((done) => {
    reportModel.deleteMany({}, (err) => {
      done();
    });
  });

  describe("/GET Report", () => {
    it("it should GET the report", (done) => {
      let report = new reportModel({
        cmdtyName: "Potato",
        cmdtyID: "VE-42",
        marketID: "market-1",
        marketName: "Vashi Navi Mumbai",
        users: ["user-1", "user-2"],
        priceUnit: "Kg",
        price: 15,
      });
      report.save((err, report) => {
        chai
          .request(server)
          .get(`/reports?reportID=${report._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });
  describe("/POST Report", () => {
    it("it should POST a report", (done) => {
      let reportDetails = {
        userID: "user-1",
        marketID: "market-1",
        marketName: "Vashi Navi Mumbai",
        cmdtyID: "cmdty-1",
        marketType: "Mandi",
        cmdtyName: "Potato",
        priceUnit: "Pack",
        convFctr: 50,
        price: 700,
      };
      chai
        .request(server)
        .post("/reports")
        .send({ reportDetails })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST Report", () => {
    it("it should POST a report", (done) => {
      let reportDetails = {
        userID: "user-2",
        marketID: "market-1",
        marketName: "Vashi Navi Mumbai",
        cmdtyID: "cmdty-1",
        marketType: "Mandi",
        cmdtyName: "Potato",
        priceUnit: "Pack",
        convFctr: 100,
        price: 1600,
      };
      chai
        .request(server)
        .post("/reports")
        .send({ reportDetails })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
