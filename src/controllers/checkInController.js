const controller = {};

controller.checkInForm = (req, res) => {
  res.render('check-inForm',{msg:0});
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(data);
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO checkindata set ?', data, (err, checkindata) => {
    	console.log(checkindata);
    	if(checkindata.insertId > 0){
      		res.redirect('/successCheckIn');
  		}else{
  			res.redirect('/errorCheckIn');
  		}
    })
  })
};

controller.success = (req, res) => {
	res.render('check-inForm',{msg:1});
};

controller.error = (req, res) => {
	res.render('check-inForm',{msg:0});
};

module.exports = controller;