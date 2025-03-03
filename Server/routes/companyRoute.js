const express = require('express');
const router = express.Router();
const {createCompany,signInCompany, editCompany} = require('../controllers/comapanyController');
const { verifyToken } = require('../utils/validateToken');

router.post('/register/company', createCompany);
router.post('/signin/company', signInCompany);
router.patch('/company/:id',verifyToken,editCompany);

module.exports = router;
// http://localhost:8080/api/signin/company
// http://localhost:8080/api/register/company
// http://localhost:8080/api/company/:id