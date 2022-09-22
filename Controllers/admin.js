const { default: axios } = require('axios');
const catchErrorAsync = require('../utility/catchErrorAsync');

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

module.exports = { home, subject };
