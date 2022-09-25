const { Kinesis } = require('aws-sdk');
const axios = require('axios');
const User = require('../models/user');
const catchErrorAsync = require('../utility/catchErrorAsync');
const Subject = require('../models/subject');
const FeatureAPI = require('../utility/featureApi');
const AppError = require('../utility/appError');
const File = require('../models/file');

const home = async (req, res, next) => {
  try {
    const books = await (
      await axios.get('http://127.0.0.1:8000/api/v1/books/')
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
      await axios.get('http://localhost:8000/api/v1/subjects/')
    ).data.data;
    console.log(books.length);
    res.render('client/home', {
      books,
      teachers,
      mavzular,
      newArr,
    });
  } catch (error) {
    console.log(error);
  }
};
const subjects = async (req, res, next) => {
  try {
    const url = req._parsedUrl.pathname;
    const path = req._parsedUrl.path;
    let data;
    if (!req.query.search) {
      data = await axios.get(`http://localhost:8000/api/v1${path}`);
      console.log('hello' + data);
    } else {
      let regex = new RegExp(req.query.search, 'i');

      data = await Subject.find({ name: regex })
        .populate({ path: 'files' })
        .populate({ path: 'teachers' });
      data = { data: { data: data } };
      console.log('byyyyyyyyyyyyy' + data);
    }
    // console.log(data.data.map((val) => val.teachers));
    const kalla = data.data.data;

    console.log('kallllllllllll', { kalla });

    const arra = kalla.map((val) => {
      return { num: val.teachers.length };
    });
    const files = kalla.map((val) => {
      return { num: val.files.length };
    });

    console.log('tttt', arra);

    res.render('client/topics', { kalla, arra, files, url });
  } catch (error) {
    console.log(error);
  }
};

const books = async (req, res, next) => {
  try {
    const url = req._parsedUrl.pathname;
    const path = req._parsedUrl.path;
    let book;
    if (!req.query.search) {
      book = await axios.get(`http://localhost:8000/api/v1${path}`);
      console.log('hello' + book.data.data);
    } else {
      let regex = new RegExp(req.query.search, 'i');
      book = await File.find({ name: regex });
      // .populate({ path: 'subjectId', select: 'name' })
      // .populate({ path: 'teacherId', select: 'name photo email' });
      book = { data: { data: book } };
    }
    const file = book.data.data.map((val) => {
      return { name: val.key };
    });
    const size = book.data.data.map((val) => {
      return { name: val.size };
    });

    const och = book.data.data.map((val) => {
      return {
        name: `http://localhost:8000/api/v1/buckets/${val.key}`,
      };
    });
    res.render('client/books', { file, size, och, url });
  } catch (error) {
    console.log(error);
  }
};

const teacherRender = catchErrorAsync(async (req, res, next) => {
  const url = req._parsedUrl.pathname;
  const path = req._parsedUrl.path;
  let data;
  if (!req.query.search) {
    data = await axios.get(`http://localhost:8000/api/v1${path}`);
    console.log('hello');
  } else {
    let regex = new RegExp(req.query.search, 'i');
    data = await User.find({ name: regex });
    data = { data: { data: data } };
    console.log('byyyyyyyyyyyyy' + data);
  }

  const teachers = data.data.data.filter((word) => word.role === 'teacher');
  let newArr = [];

  const subjects = teachers.map((val) => {
    let variable = val.subjects[0] || { name: '' };
    newArr.push(variable.name);
  });
  res.render('client/teachers', { teachers, newArr, url });
});
const loginRender = catchErrorAsync(async (req, res, next) => {
  res.render('client/login');
});
const aboutRender = catchErrorAsync(async (req, res, next) => {
  const { data } = await axios('http://localhost:8000/api/v1/posts/');

  console.log(data.data, 'makandja');
  res.render('client/about', { data: data.data });
});
const contact = async (req, res, next) => {
  console.log('wsvsves');
  try {
    res.render('client/contact');
    console.log('hello');
  } catch (err) {
    console.log('salom');
    res.render('error');
  }
};

module.exports = {
  teacherRender,
  loginRender,
  aboutRender,
  home,
  contact,
  subjects,
  books,
};
