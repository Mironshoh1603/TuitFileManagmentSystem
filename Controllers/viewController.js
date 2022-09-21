const axios = require('axios');
const catchErrorAsync = require('../utility/catchErrorAsync');

const home = async (req, res, next) => {
  try {
    const books = await (
      await axios.get('http://127.0.0.1:8000/api/v1/files/')
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
const salom = async (req, res, next) => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/v1/subjects');
    // console.log(data.data.map((val) => val.teachers));
    const kalla = data.data;

    console.log('kallllllllllll', { kalla });

    const arra = kalla.map((val) => {
      return { num: val.teachers.length };
    });
    const files = kalla.map((val) => {
      return { num: val.files.length };
    });

    console.log('tttt', arra);

    res.render('topics', { kalla, arra, files });
  } catch (error) {
    console.log(error);
  }
};

const books = async (req, res, next) => {
  try {
    const book = await axios.get(`http://localhost:8000/api/v1/files`);
    const file = book.data.data.map((val) => {
      return { name: val.key };
    });
    const size = book.data.data.map((val) => {
      return { name: val.size };
    });
    console.log('bu sizeeeeee', size);
    console.log(
      'buu boookkk',
      book.data.data.map((val) => {
        return { name: val };
      })
    );

    const och = book.data.data.map((val) => {
      
      return {
        name: `http://localhost:8000/api/v1/buckets/${val.key}`,
      };
    });
    console.log('occccccccccc', och);
    res.render('books', { file, size,och });
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
  res.render('client/teachers', { teachers, newArr });
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
  salom,
  books,
};
