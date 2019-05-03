const controller = {};

controller.baggageForm = (req, res) => {
  res.render('baggageForm',{msg:0});
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(data);
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO baggagedeliverydata set ?', data, (err, baggagedeliverydata) => {
    	console.log(baggagedeliverydata);
    	if(baggagedeliverydata.insertId > 0){
      		res.redirect('/success');
  		}else{
  			res.redirect('/error');
  		}
    })
  })
};

controller.success = (req, res) => {
	res.render('baggageForm',{msg:1});
};

controller.error = (req, res) => {
	res.render('baggageForm',{msg:0});
};

module.exports = controller;