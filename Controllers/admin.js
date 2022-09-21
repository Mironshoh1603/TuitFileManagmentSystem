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
  res.render('admin/subject');
});

module.exports = { home,subject };
