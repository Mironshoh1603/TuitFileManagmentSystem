const axios = require('axios');
const catchErrorAsync = require('../utility/catchErrorAsync');
const axios1 = require('axios').default;

const home = async (req, res, next) => {
  try {
    const books = await (
      await axios1.get('http://127.0.0.1:8000/api/v1/files/')
    ).data.data;
    const { data } = await axios('http://localhost:8000/api/v1/users/');
    const teachers = data.data.filter((word) => word.role === 'teacher');
    let newArr = [];
    const subjects = teachers.map((val) => {
      let variable = val.subjects[0] || { name: '' };
      newArr.push(variable.name);
    });
    console.log(newArr, 'mana subjects');
    const mavzular = await (
      await axios1.get('http://localhost:8000/api/v1/subjects/')
    ).data.data;
    console.log(books.length);
    res.render('home', {
      books,
      teachers,
      mavzular,
      newArr,
    });
  } catch (error) {
    console.log(error);
  }
};

const teacherRender = catchErrorAsync(async (req, res, next) => {
  const { data } = await axios('http://localhost:8000/api/v1/users/');
  // console.log('datacha ', data);
  const teachers = data.data.filter((word) => word.role === 'teacher');
  let newArr = [];
  console.log(teachers, 'dvgvdv');

  const subjects = teachers.map((val) => {
    let variable = val.subjects[0] || { name: '' };
    newArr.push(variable.name);
  });
  console.log(newArr, 'mana subjects');
  res.render('teachers', { teachers, newArr });
});
const loginRender = catchErrorAsync(async (req, res, next) => {
  res.render('login');
});
const aboutRender = catchErrorAsync(async (req, res, next) => {
  const { data } = await axios('http://localhost:8000/api/v1/posts/');

  console.log(data.data, 'makandja');
  res.render('about', { data: data.data });
});
const contact = async (req, res, next) => {
  console.log('wsvsves');
  try {
    res.render('contact');
    console.log('hello');
  } catch (err) {
    console.log('salom');
    res.render('error');
  }
};
module.exports = {
  home,
  teacherRender,
  loginRender,
  aboutRender,
  home,
  contact,
};
