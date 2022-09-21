const teacherAdd = async (
  name,
  username,
  email,
  photo,
  password,
  subjectId
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/',
      data: {
        name,
        username,
        email,
        photo,
        password,
        subjectId: [subjectId],
      },
    });
    if (res.status === 200) {
      console.log('hello');
      alert('You logged successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    console.log(err.response);
  }
};

let addTeacher = document.querySelector('.addTeacher');
let editTeacher = document.querySelector('.editTeacher');
addTeacher.addEventListener('click', (e) => {
  document.querySelector('.addTeacherForm').classList.toggle('d-none');
});
document.querySelector('.addForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password');
  const passwordConfirm = document.querySelector('#passwordConfirm').value;
  const photo = document.querySelector('#formFile').value;
  const subjectId = document.querySelector('#subjectId');
  teacherAdd(
    name,
    username,
    email,
    password,
    passwordConfirm,
    photo,
    subjectId
  );

  document.querySelector('.addTeacherForm').classList.toggle('d-none');
});
editTeacher.addEventListener('click', () => {
  console.log('hello');
  document.querySelector('.editTeacherForm').classList.toggle('d-none');
});
document.querySelector('.editForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.editTeacherForm').classList.toggle('d-none');
});
