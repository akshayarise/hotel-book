var loopback = require('loopback');
var mysql = require('mysql')

const dataSource = loopback.createDataSource({
  connector: 'mysql',
  port: 3306,
  host: 'localhost',
  user: 'root',
  database: 'hotelbooking',
  password: 'password',
});

let models = {};
models.User = loopback.createModel({
  name: 'user',
  properties: {
    id: {
      type: 'Number',
      required: false,
    },
    username: {
      type: 'String',
      required: false,
      length: 40,
    },
    hotelNamesAndRatings: {
      type: 'Object',
      required: false,
      length: 40,
    },
    rating: {
      type: 'Number',
      required: false,
    },
    password: {
      type: 'String',
      required: false,
      length: 40,
    },
  },
  relations: {
    userhotels: {
      type: 'hasAndBelongsToMany',
      model: 'hotel',
    },
  },
});
models.Hotel = loopback.createModel({
  name: 'hotel',
  properties: {
    id: {
      type: 'Number',
      required: false,
    },
    hotelname: {
      type: 'String',
      required: false,
      length: 40,
    },
    createdAt: 'Date',
    lastModifiedAt: {
      type: 'date',
      required: false,
    },
    data: {
      type: 'Object',
      required: false,
    },
  },
  relations: {
    userhotels: {
      type: 'hasAndBelongsToMany',
      model: 'user',
    },
  },
});

models.User.attachTo(dataSource);
models.Hotel.attachTo(dataSource);
dataSource.autoupdate();

module.exports = models;
