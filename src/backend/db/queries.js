const { mongo } = require('./config');

const insertOne = ({ collection = '', value = {} }) =>
  mongo()
    .collection(collection)
    .insertOne(value);

const insertMany = ({ collection = '', values = [] }) =>
  mongo()
    .collection(collection)
    .insertMany(values);

const selectOne = ({ collection = '', query = {} }) =>
  mongo()
    .collection(collection)
    .findOne(query);

const selectMany = ({ collection = '', query = {}, sort = {} }) =>
  mongo()
    .collection(collection)
    .find(query)
    .sort(sort)
    .toArray();

const updateOne = ({ collection = '', query = {}, update = {} }) =>
  mongo()
    .collection(collection)
    .updateOne(query, {
      $set: update
    });

const updateMany = ({ collection = '', query = {}, update = {} }) =>
  mongo()
    .collection(collection)
    .updateMany(query, {
      $set: update
    });

const deleteOne = ({ collection = '', query = {} }) =>
  mongo()
    .collection(collection)
    .deleteOne(query);

const deleteMany = ({ collection = '', query = {} }) =>
  mongo()
    .collection(collection)
    .deleteMany(query);

module.exports = {
  insertOne,
  insertMany,
  selectOne,
  selectMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany
};
