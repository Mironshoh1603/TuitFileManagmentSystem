const axios = require('axios');
const catchErrorAsync = require('../utility/catchErrorAsync');

const home = async (req, res, next) => {
  try {
    res.render('base');
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
module.exports = { home, teacherRender, loginRender, aboutRender };
