const express = require('express');
const router = express.Router();
const { createTeamMember, signInTeamMember, editTeamMember } = require('../controllers/teamController');
const { verifyToken } = require('../utils/validateToken');

router.post('/register/teammember', createTeamMember);
router.post('/signin/teammember', signInTeamMember);
router.patch('/teammember/:id',verifyToken, editTeamMember);

module.exports = router;
//http://localhost:8080/api/register/teammember
//http://localhost:8080/api/signin/teammember
//http://localhost:8080/api/teammember/:id