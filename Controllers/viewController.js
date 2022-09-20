const axios = require('axios').default;

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

const contact = async (req, res, next) => {
  try {
    res.render('contact');
    console.log('hello');
  } catch (err) {
    res.render('error');
    console.log('salom');
  }
};
module.exports = { home, contact };
