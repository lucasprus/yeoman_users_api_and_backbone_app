/*
 * User Routes
 */
var User = require('../data/models/user');
var loadUser = require('./middleware/load_user');
var async = require('async');
var maxUsersPerPage = 5;
module.exports = function (app) {
    app.get('/api/users', function (req, res, next) {
        var page = (req.query.page && parseInt(req.query.page, 10)) || 1;
        async.parallel([
                function (next) {
                    User.count(next);
                },
                function (next) {
                    User.find({})
                        .sort('username')
                        .skip((page - 1) * maxUsersPerPage)
                        .limit(maxUsersPerPage)
                        .exec(next);
                }
            ],
            // final callback

            function (err, results) {
                if (err) {
                    return next(err);
                }
                var count = results[0],
                    users = results[1];
                res.json({
                    users: users,
                    count: count,
                    maxUsersPerPage: maxUsersPerPage
                });
            });
    });
    app.get('/api/users/:name', loadUser, function (req, res) {
        // console.log( req.user.hasOwnProperty('email'));
        res.json(req.user);
    });
    app.post('/api/users', function (req, res) {
        User.create(req.body, function (err) {
            if (err) {
                if (err.code === 11000 || err.code === 11001) {
                    return res.json({
                            message: 'Username already exists'
                    }, 409);
                }
                if (err.name === 'ValidationError') {
                    return res.json({
                            message: Object.keys(err.errors).map(function (errField) {
                                return err.errors[errField].message;
                            }).join('. \n')
                    }, 406);
                }
                return res.json({
                    message: err
                }, 500);
            }
            return res.json({
                success: 'User created'
            });
        });
    });
    app.put('/api/users/:name', loadUser, function (req, res) {
        req.user.set('name', req.body.name);
        req.user.set('email', req.body.email);
        req.user.set('password', req.body.password);
        req.user.set('birthday', req.body.birthday);
        req.user.set('gender', req.body.gender);
        req.user.set('bio', req.body.bio);
        req.user.save(function (err) {
            if (err) {
                if (err.code === 11000 || err.code === 11001) {
                    return res.json({
                            message: 'Username already exists'
                    }, 409);
                }
                if (err.name === 'ValidationError') {
                    return res.json({
                            message: Object.keys(err.errors).map(function (errField) {
                                return err.errors[errField].message;
                            }).join('. ')
                    }, 406);
                }
                return res.json({
                    error: err
                }, 500);
            }
            return res.json({
                success: 'User updated'
            });
        });
    });
    app.del('/api/users/:name', loadUser, function (req, res) {
        req.user.remove(function (err) {
            if (err) {
                res.json({
                    error: err
                }, 500);
            } else {
                res.json({
                    success: 'User deleted'
                });
            }
        });
    });
};
