const router = require('express').Router();

const baggageDeliveryController = require('../controllers/baggageDeliveryController');
const checkInController = require('../controllers/checkInController');
const generateReportController = require('../controllers/generateReportController');

/* Baggage form router */
router.get('/', baggageDeliveryController.baggageForm);
router.post('/add', baggageDeliveryController.save);
router.get('/success', baggageDeliveryController.success);
router.get('/error', baggageDeliveryController.error);

/* Check In form router */
router.get('/check-in', checkInController.checkInForm);
router.post('/addCheckIn', checkInController.save);
router.get('/successCheckIn', checkInController.success);
router.get('/errorCheckIn', checkInController.error);

/* Excel file route */
router.get('/generateReport', generateReportController.generateReport);
//router.get('/generateReport2', generateReportController.generateReportSecond);


module.exports = router;
