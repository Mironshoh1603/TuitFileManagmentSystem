// const { default: axios } = require('axios');
const catchErrorAsync = require('../utility/catchErrorAsync');
const axios = require('axios');
const User = require('./../models/user');
const home = catchErrorAsync(async (req, res, next) => {
  const teachers = await axios(
    'http://localhost:8000/api/v1/users?role=teacher'
  );
  const subjects = await axios('http://localhost:8000/api/v1/subjects/');
  const files = await axios('http://localhost:8000/api/v1/files/');
  console.log(
    teachers.data.results,
    files.data.results,
    subjects.data.results,
    "o'lchamlari"
  );
  res.render('admin/index', { subjects, files, teachers });
});
const teacherRender = catchErrorAsync(async (req, res, next) => {
  const teachers = await axios(
    'http://localhost:8000/api/v1/users?role=teacher'
  );
  res.render('admin/teacher', {
    teachers,
  });
});
const profil = catchErrorAsync(async (req, res, next) => {
  const admin = await User.findOne({ role: 'admin' });
  console.log(admin);
  res.render('admin/profil', { admin });
});

const kitoblar = catchErrorAsync(async (req, res, next) => {
  let books = await axios('http://localhost:8000/api/v1/files/');
  books = books.data.data;
  let teachers = [];

  books.map((val) => {
    let variable = val.teacherId || {
      name: 'Nimajon Nimayev',
      photo: 'user.jpeg',
      email: 'nima@gmail.com',
    };
    teachers.push(variable);
  });
  res.render('admin/book', { books, teachers });
});

const subject = catchErrorAsync(async (req, res, next) => {
  console.log('mana');
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
  console.log('teachers', teachers);
  res.render('admin/subject', { subjects, teachers });
});
const checkUser = async (req, res, next) => {
  try {
    let sal = await axios.get('http://localhost:8000/api/v1/users/me');
    console.log('bu salllllllllllllllllllllllllllll', sal);
    res.render('admin/__sidebar');
  } catch (error) {
    console.log(error);
  }
};

// module.exports = { home, kitoblar };
module.exports = { home, kitoblar, teacherRender, profil, subject, checkUser };
// module.exports = { home, subject };
// module.exports = { home, teacherRender, profil, subject };
