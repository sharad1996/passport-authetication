import express from 'express';
import controller from '../controllers/user';

const router  = express.Router();

//post signup data
router.post('/signup' , controller.signup);

//post login data
router.post('/login', controller.login);

module.exports = router;
