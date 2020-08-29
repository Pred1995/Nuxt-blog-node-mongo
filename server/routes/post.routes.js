const passport = require('passport')
const { Router } = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/post.controller')
const router = Router()

// admin
router.post(
  '/admin/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.create
)

router.get(
  '/admin/', passport.authenticate('jwt', { session: false }), controller.getAll
)

router.get(
  '/admin/:id', passport.authenticate('jwt', { session: false }), controller.getByID
)

router.put(
  '/admin/:id', passport.authenticate('jwt', { session: false }), controller.update
)

router.delete(
  '/admin/:id', passport.authenticate('jwt', { session: false }), controller.remove
)

// base
router.get(
  '/', controller.getAll
)
router.get(
  '/:id', controller.getByID
)
router.put(
  '/add/view/:id', controller.addView
)

router.get(
  '/admin/get/analytics', passport.authenticate('jwt', { session: false }), controller.getAnalytisz
)

module.exports = router
