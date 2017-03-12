const express   = require('express');
const router    = express.Router();

/*----------------------- ROUTES ---------------------------------------*/
// ROOT URL
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api', (req, res) => {
  res.render('index');
});

module.exports = router;
