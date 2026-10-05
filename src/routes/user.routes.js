// Routes under /api/v1/user
// Each route runs: validation rules -> validate (400 on failure) -> controller.
const express = require('express');
const { signupRules, loginRules } = require('../validators/user.validators');
const validate = require('../middleware/validate');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', signupRules, validate, userController.signup);
router.post('/login', loginRules, validate, userController.login);

module.exports = router;
