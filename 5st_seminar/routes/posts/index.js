const express = require('express');
const router = express.Router();
const postController = require('../../controller/postController');
const multer = require('multer');
const upload = require('../../modules/multer');
/*const { single } = require('../../modules/multer');
const upload = multer({
  dest: 'upload/'
});
*/

router.post('/', postController.createPost);
router.post('/postimg', upload.single('image'), postController.single);
/*router.post('/', postController.createPost);*/
router.get('/', postController.readAllPosts);
router.post('/:postId/like', postController.createLike);
router.post('/:postId/deletelike', postController.deleteLike);

module.exports = router;
