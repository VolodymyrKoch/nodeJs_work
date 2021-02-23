const { Router } = require('express');
const UserController = require('../controllers/users.controllers');
const { authorize } = require('../controllers/authController.js');

const router = Router();

router.post(
  '/auth/register',
  UserController.validateUser,
  UserController.registerNewUser,
);
router.post('/auth/login', UserController.validateUser, UserController.login);
router.get('/auth', authorize, UserController.authUser);
router.get('/auth/logout/:userId', authorize, UserController.logout);
router.get('/users/current', authorize, UserController.getCurrentUser);
router.post(
  '/users',
  UserController.upload.single('userAvatar'),
  (req, res) => {
    // console.log('file', req.file);
    // console.log('body', req.body);
    res.send({ file: req.file, ...req.body });
  },
);

module.exports = router;
// joi валідаці
// patch новий роут +authorize
// функція перевірки паролю,  картинки і всього разом на картинку+пароль і якшо нічого нема
//