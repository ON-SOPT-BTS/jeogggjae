const crypto = require('crypto');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { User, Post } = require('../models');
const { userService } = require('../service');
const post = require('../models/post');
const jwt = require('../modules/jwt');



/*
const user = await userService.signin(email, password, salt);

const {accessToken, refreshToken} = await jwt.sign(user);
return res.status(status) 
*/


module.exports = {
  signup: async (req, res) => {
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try {
      const alreadyEmail = await userService.readOneEmail(email);
      if (alreadyEmail) {
        console.log('이미 존재하는 이메일 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
      }
      const user = await userService.signup(email, password, userName);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, user));



    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const alreadyEmail = await userService.emailCheck(email);
      if (!alreadyEmail) {
        console.log('없는 이메일 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EMAIL));
      }

      const { salt, password: hashedPassword } = alreadyEmail;
      const user = await userService.signin(email, password, salt);

      if (!user) {
        console.log('비밀번호가 일치하지 않습니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
      }

      const { accessToken, refreshToken } = await jwt.sign(user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
        accessToken,
        refreshToken
      }));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
    }
  },

  put: async (req, res) => {
    const { id } = req.params;
    const { email, userName, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: ["id", "email", "userName", "password"],
      });

      if (!User) {
        return res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

      const modiyUser = await User.update({
        email,
        password: hashedPassword,
        userName,
        salt,
      },
        {
          where: {
            id,
          },
        });

      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.UPDATE_USER_SUCCESS));

    } catch (err) {
      console.error(error);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_USER_FAIL));
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });

      if (!User) {
        return res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      const deleteUsers = await User.destroy({
        where: {
          id,
        },
        attributes: ['id', 'userName', 'email'],
      });
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.DELETE_USER_SUCCESS));
    } catch (err) {
      console.error(error);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_USER_FAIL));
    }
  },

  readAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'userName'],
      });

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_READ_ALL_SUCCESS, users));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));
    }
  },
  readOne: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        console.log('존재하지 않는 아이디 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, user));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_ALL_FAIL));
    }
  },
  getProfile: async (req, res) => {
    const { id } = req.decoded;
    console.log(req.decoded);
    try {
      const user = await User.findOne({ where: { id }, attributes: ['id', 'userName', 'email'] });
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, user));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));
    }
  }

}

