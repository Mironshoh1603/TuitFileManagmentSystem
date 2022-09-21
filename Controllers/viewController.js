const axios = require('axios');

const home = async (req, res, next) => {
  try {
    res.render('base');
  } catch (error) {
    console.log(error);
  }
};
const salom = async (req, res, next) => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/v1/subjects');
    // console.log(data.data.map((val) => val.teachers));
    const kalla = data.data;

    console.log('kallllllllllll', { kalla });

    const arra = kalla.map((val) => {
      return { name: val.teachers.length };
    });

    console.log('tttt', { arra });

    res.render('topics', { kalla, arra });
  } catch (error) {
    console.log(error);
  }
};

const books = async (req, res, next) => {
  try {
    const book = await axios.get(`http://localhost:8000/api/v1/files`);
    const file= book.data.data.map((val)=> { return  {name: val.key}})
    console.log('buu boookkk', book.data.data.map((val)=> { return  {name: val.name}}));
    res.render('books', {file});
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, salom, books };
