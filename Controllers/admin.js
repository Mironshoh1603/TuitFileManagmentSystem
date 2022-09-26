// const { default: axios } = require('axios');
const catchErrorAsync = require('../utility/catchErrorAsync');
const axios = require('axios');
const User = require('./../models/user');
const Subject = require('./../models/subject');
const Book = require('./../models/file');
const home = catchErrorAsync(async (req, res, next) => {
  console.log(req.user);

  const user = req.user;
  let role;
  if (req.user.role === 'admin') {
    role = true;
  } else if (req.user.role === 'teacher') {
    role = false;
  }

  const teachers = await axios(
    'http://localhost:8000/api/v1/users?role=teacher'
  );
  const subjects = await axios('http://localhost:8000/api/v1/subjects/');
  const files = await axios('http://localhost:8000/api/v1/books/');
  // console.log(
  //   teachers.data.results,
  //   files.data.results,
  //   subjects.data.results,
  //   "o'lchamlari"
  // );
  res.render('admin/index', { subjects, files, teachers, user, role });
});
const teacherRender = catchErrorAsync(async (req, res, next) => {
  const user = req.user;
  const path = req._parsedUrl.path;
  console.log(path + '_____path');
  const url = req._parsedOriginalUrl.pathname;
  let data;
  if (!req.query.search) {
    data = await axios.get(`http://localhost:8000/api/v1${path}`);
  } else {
    let regex = new RegExp(req.query.search, 'i');
    data = await User.find({ name: regex })
      .populate({ path: 'subjects' })
      .populate({ path: 'files' });

    data = { data: { data: data } };
  }

  let role;

  if (req.user.role === 'admin') {
    role = true;
  } else if (req.user.role === 'teacher') {
    role = false;
  }
  let subjects = [];
  const teachers = data.data.data;
  let counts = await axios.get('http://localhost:8000/api/v1/users?limit=500');
  counts = counts.data.data;
  let count = Object.keys(counts).length;
  console.log(count);
  let paginationArr = [];
  for (let i = 1; i <= count / 10 + 1; i++) {
    paginationArr.push(i);
  }
  teachers.map((val) => {
    let variable = val.subjects[0] || {
      name: 'Nima fani va nazariyasi',
    };
    subjects.push(variable);
  });

  // console.log(subjects, '_subjects');
  let allSubjects = await axios('http://localhost:8000/api/v1/subjects/');
  allSubjects = allSubjects.data.data;
  res.render('admin/teacher', {
    teachers,
    subjects,
    allSubjects,
    user,
    role,
    path,
    url,
    paginationArr,
  });
});
const profil = catchErrorAsync(async (req, res, next) => {
  console.log(req);

  const user = req.user;
  const path = console.log(req._parsedUrl.path);
  let role;
  if (req.user.role === 'admin') {
    role = true;
  } else if (req.user.role === 'teacher') {
    role = false;
  }
  res.render('admin/profile', { user, role, path });
});

const kitoblar = catchErrorAsync(async (req, res, next) => {
  const user = req.user;
  console.log(user);
  const path = req._parsedUrl.path;
  console.log(path + '_____path');
  const url = req._parsedOriginalUrl.pathname;
  let data;
  if (!req.query.search) {
    data = await axios.get(`http://localhost:8000/api/v1${path}`);
  } else {
    let regex = new RegExp(req.query.search, 'i');
    data = await Book.find({ name: regex })
      .populate({ path: 'subjectId' })
      .populate({ path: 'teacherId' });
    console.log(data);
    data = { data: { data: data } };
  }
  let role;
  if (req.user.role === 'admin') {
    role = true;
  } else if (req.user.role === 'teacher') {
    role = false;
  }
  let books = data.data.data;
  let counts = await axios.get('http://localhost:8000/api/v1/books?limit=500');
  counts = counts.data.data;
  let count = Object.keys(counts).length;
  console.log(count);
  let paginationArr = [];
  for (let i = 1; i <= count / 10 + 1; i++) {
    paginationArr.push(i);
  }
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
  res.render('admin/book', {
    books,
    teachers,
    teacherDatas,
    subjects,
    user,
    role,
    url,
    paginationArr,
  });
});

const subject = catchErrorAsync(async (req, res, next) => {
  const user = req.user;
  const path = req._parsedUrl.path;
  console.log(path + '_____path');
  const url = req._parsedOriginalUrl.pathname;
  let data;
  if (!req.query.search) {
    data = await axios.get(`http://localhost:8000/api/v1${path}`);
  } else {
    let regex = new RegExp(req.query.search, 'i');
    data = await Subject.find({ name: regex })
      .populate({ path: 'teachers' })
      .populate({ path: 'files' });
    console.log(data);
    data = { data: { data: data } };
  }

  let role;
  if (req.user.role === 'admin') {
    role = true;
  } else if (req.user.role === 'teacher') {
    role = false;
  }
  // console.log('mana');
  console.log(url);
  let subjects = data;
  subjects = subjects.data.data;
  let counts = await axios.get(
    'http://localhost:8000/api/v1/subjects?limit=500'
  );
  counts = counts.data.data;
  let count = Object.keys(counts).length;
  console.log(count);
  let paginationArr = [];
  for (let i = 1; i <= count / 10 + 1; i++) {
    paginationArr.push(i);
  }
  console.log(subjects);
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
  res.render('admin/subject', {
    subjects,
    teachers,
    user,
    role,
    url,
    paginationArr,
  });
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

const search = catchErrorAsync(async (req, res, next) => {
  const url = req._parsedUrl.path;
  const data = await axios.get(`http://localhost:8000/api/v1/`);
});
// module.exports = { home, kitoblar };
module.exports = {
  home,
  kitoblar,
  teacherRender,
  profil,
  subject,
  checkUser,
  search,
};
// module.exports = { home, subject };
// module.exports = { home, teacherRender, profil, subject };
