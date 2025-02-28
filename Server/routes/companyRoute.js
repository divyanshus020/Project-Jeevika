const express = require('express');
const router = express.Router();
const {createCompany,signInCompany, editCompany} = require('../controllers/comapanyController');

router.post('/register/company', createCompany);
router.post('/signin/company', signInCompany);
router.patch('/company/:id', editCompany);

module.exports = router;
// http://localhost:8080/api/signin/company
// http://localhost:8080/api/register/company
// http://localhost:8080/company/:id