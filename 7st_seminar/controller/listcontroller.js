const express = require('express');
const router = express.Router();
const ut = require('../modules/ut');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const list = require('../models/list');

module.exports = {
    get: async (req, res) => {
        try {
            const category = req.params;
            if (category === 'mostSearch') {
                const list = await list.findAll({
                    order: [
                        ['mostSearch', 'DESC']
                    ],
                    attributes: ['id', 'title', 'subtitle', 'imageUrl', 'mostSearch']
                })
                const putlist = list.map(data => data.get({ plain: true }));
                return res.status(sc.OK).send(ut.success(sc.OK, rm.GET_MOST_SEARCH_SUCCESS, putlist));

            }
        } catch (err) {
            console.log(err)
            return res
                .status(sc.INTERNAL_SERVER_ERROR)
                .send(ut.success(sc.INTERNAL_SERVER_ERROR));
        }
    }
}