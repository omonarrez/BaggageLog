const controller = {};
const Excel = require('exceljs');
const moment = require('moment');

controller.generateReport = (req, res) => {
  req.getConnection((err, connection) => {
    const query = connection.query('SELECT * FROM baggagedeliverydata', (err, baggagedata) => {
    	

      var workbook = new Excel.Workbook();

      workbook.views = [
        {
          x: 0, y: 0, width: 10000, height: 20000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
      ]

      var worksheet = workbook.addWorksheet('Report');

      worksheet.columns = [
          { header: 'Completion Time', key: 'completion_time', width: 20 },
          { header: 'Email', key: 'email', width: 30 },
          { header: 'Name', key: 'name', width: 20 },
          { header: 'Date', key: 'date', width: 20 },
          { header: 'Flight Number', key: 'flight_number', width: 20 },
          { header: 'Scheduled Arrival Time of flight', key: 'satof', width: 30 },
          { header: 'Actual Arrival Time of flight.', key: 'aatof', width: 30 },
          { header: 'Time main cabin door is opened.', key: 'tmcdio', width: 30 },
          { header: 'Time left aerodrome.', key: 'tla', width: 20 },
          { header: 'Time arrived at McKay camp.', key: 'taamc', width: 30 },
          { header: 'Time baggage claim area open at McKay camp.', key: 'tbcaoamc', width: 30 },
          { header: 'Delivery Times McKay', key: 'dtm', width: 30 },
          { header: 'Time arrived at Richardson camp.', key: 'taarc', width: 30 },
          { header: 'Time baggage claim area open at Richardson camp.', key: 'tbcaoarc', width: 30 },
          { header: 'Delivery Times Richardson', key: 'dtr', width: 30 },
          { header: 'Were there any issues driving from aerodrome to camp(s)?', key: 'wtaidfatc', width: 30 },
          { header: 'Record any issues experienced.', key: 'raie', width: 30 }
      ];

      //Add a couple of Rows by key-value, after the last current row, using the column keys
      for(var i=0;i<baggagedata.length;i++){
        var wtaidfatc = '';
        (baggagedata[i].wtaidfatc == 1) ?  wtaidfatc = 'Yes' : wtaidfatc = 'No';
   
        worksheet.addRow({
          completion_time:baggagedata[i].time,
          email:'example@example.com',
          name:'Joey',
          date:baggagedata[i].date,
          flight_number:baggagedata[i].flightNumber,
          satof:baggagedata[i].satof,
          aatof:baggagedata[i].aatof,
          tmcdio:baggagedata[i].tmcdio, // H2 
          tla:baggagedata[i].tla,
          taamc:baggagedata[i].taamc,
          tbcaoamc:baggagedata[i].tbcaoamc, // K2
          taarc:baggagedata[i].taarc,
          tbcaoarc:baggagedata[i].tbcaorc,
          wtaidfatc:wtaidfatc,
          raie:baggagedata[i].raie
        });

        if(baggagedata[i].wtaf == 1){
          worksheet.addRow({
            completion_time:baggagedata[i].time,
            email:'example@example.com',
            name:'Joey',
            date:baggagedata[i].date,
            flight_number:baggagedata[i].flightNumber1,
            satof:baggagedata[i].satof1,
            aatof:baggagedata[i].aatof1,
            tmcdio:baggagedata[i].tmcdio1,
            tla:baggagedata[i].tla,
            taamc:baggagedata[i].taamc,
            tbcaoamc:baggagedata[i].tbcaoamc,
            taarc:baggagedata[i].taarc,
            tbcaoarc:baggagedata[i].tbcaorc,
            wtaidfatc:wtaidfatc,
            raie:baggagedata[i].raie
          });
        }

        if(baggagedata[i].wtaf1 == 1){
          worksheet.addRow({
            completion_time:baggagedata[i].time,
            email:'example@example.com',
            name:'Joey',
            date:baggagedata[i].date,
            flight_number:baggagedata[i].flightNumber2,
            satof:baggagedata[i].satof2,
            aatof:baggagedata[i].aatof2,
            tmcdio:baggagedata[i].tmcdio2,
            tla:baggagedata[i].tla,
            taamc:baggagedata[i].taamc,
            tbcaoamc:baggagedata[i].tbcaoamc,
            taarc:baggagedata[i].taarc,
            tbcaoarc:baggagedata[i].tbcaorc,
            wtaidfatc:wtaidfatc,
            raie:baggagedata[i].raie
          });
        }

        

      }
      

      worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
         // cell.fill = {bgColor:{argb:'FF0000FF'}};
        });

      //console.log(worksheet);
      workbook.xlsx.writeFile('Report.xlsx');
      res.redirect('/');

    })
  })
};

module.exports = controller;