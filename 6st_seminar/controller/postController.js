const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const { User, Post, Like } = require('../models');
const like = require('../models/like');

module.exports = {
  createPost: async (req, res) => {
    const { userId, title, contents } = req.body;

    try {
      const user = await User.findOne({ where: { id: userId } });
      const post = await Post.create({ title, contents });
      await user.addPost(post);
      return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, post));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
    }
  },
  readAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        group: 'id',
        attributes: ['title', 'contents', [sequelize.fn("COUNT", "Liker.Like.PostId"), 'likeCnt']],
        include: [{
          model: User,
          attributes: ['id', 'userName', 'email'],
        }, {
          model: User,
          as: 'Liker',
          attributes: ['userName'],
        }]
      });
      console.log(JSON.stringify(posts, null, 2));
      return res
        .status(sc.OK)
        .send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, posts));
    } catch (err) {
      console.log(err);
      return res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_POST_ALL_FAIL));
    }
  },

  single: async (req, res) => {
    const { userId, title, contents } = req.body;
    const postImageUrl = req.file.location;

    try {
      const user = await User.findOne({ where: { id: userId } });
      const post = await Post.create({ title, contents, postImageUrl });
      await user.addPost(post);
      return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_SINGLE_SUCCESS, post));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_SINGLE_FAIL));
    }
  },

  createLike: async (req, res) => {
    const PostId = req.params.postId;
    const UserId = req.body.userId;
    try {
      const like = await Like.create({ PostId, UserId });
      return res
        .status(sc.OK)
        .send(ut.success(sc.OK, rm.CREATE_LIKE_SUCCESS, like));
    } catch (err) {
      console.log(err);
      return res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(ut.success(sc.INTERNAL_SERVER_ERROR, rm.CREATE_LIKE_FAIL));
    }
  },
  deleteLike: async (req, res) => {
    const PostId = req.params.postId;
    const UserId = req.body.userId;
    try {
      await Like.destroy({
        where: {
          UserId,
          PostId,
        },
      });
      return res.status(sc.OK).send(ut.success(sc.OK, rm.DELETE_LIKE_SUCCESS));
    } catch (err) {
      console.log(err);
      return res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(ut.success(sc.INTERNAL_SERVER_ERROR, rm.DELETE_LIKE_FAIL));
    }
  },
};