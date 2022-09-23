// const { default: axios } = require('axios');
const catchErrorAsync = require('../utility/catchErrorAsync');
const axios = require('axios');
const User = require('./../models/user');
const home = catchErrorAsync(async (req, res, next) => {
  const user = req.user;
  const teachers = await axios(
    'http://localhost:8000/api/v1/users?role=teacher'
  );
  const subjects = await axios('http://localhost:8000/api/v1/subjects/');
  const files = await axios('http://localhost:8000/api/v1/files/');
  // console.log(
  //   teachers.data.results,
  //   files.data.results,
  //   subjects.data.results,
  //   "o'lchamlari"
  // );
  res.render('admin/index', { subjects, files, teachers, user });
});
const teacherRender = catchErrorAsync(async (req, res, next) => {
  const teachersData = await axios(
    'http://localhost:8000/api/v1/users?role=teacher'
  );
  let subjects = await axios('http://localhost:8000/api/v1/subjects/');
  subjects = subjects.data.data;
  const teachers = teachersData.data.data;
  console.log(subjects);
  res.render('admin/teacher', {
    teachers,
    subjects,
  });
});
const profil = catchErrorAsync(async (req, res, next) => {
  const admin = await User.findOne({ role: 'admin' });
  // console.log(admin);
  res.render('admin/profil', { admin });
});

const kitoblar = catchErrorAsync(async (req, res, next) => {
  let books = await axios('http://localhost:8000/api/v1/files/');
  books = books.data.data;
  let teachers = [];
  let teacherDatas = await axios(
    'http://localhost:8000/api/v1/users?role=teacher'
  );
  teacherDatas = teacherDatas.data.data;
  let subjects = await axios('http://localhost:8000/api/v1/subjects/');
  subjects = subjects.data.data;
  books.map((val) => {
    let variable = val.teacherId || {
      name: 'Nimajon Nimayev',
      photo: 'user.jpeg',
      email: 'nima@gmail.com',
    };
    teachers.push(variable);
  });
  res.render('admin/book', { books, teachers, teacherDatas, subjects });
});

const subject = catchErrorAsync(async (req, res, next) => {
  // console.log('mana');
  let subjects = await axios('http://localhost:8000/api/v1/subjects/');
  subjects = subjects.data.data;
  let teachers = [];

  subjects.map((val) => {
    let variable = val.teachers[0] || {
      name: 'Nimajon Nimayev',
      photo: 'user.jpeg',
      email: 'nima@gmail.com',
    };
    teachers.push(variable);
  });
  // console.log('teachers', teachers);
  res.render('admin/subject', { subjects, teachers });
});

// module.exports = { home, kitoblar };
module.exports = { home, kitoblar, teacherRender, profil, subject };
// module.exports = { home, subject };
// module.exports = { home, teacherRender, profil, subject };
