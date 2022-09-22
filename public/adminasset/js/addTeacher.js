const addTeacherFunc = async (
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

let addTeacherBtn = document.querySelector('.addTeacher');
let editTeacherBtn = document.querySelector('.editTeacher');
addTeacherBtn.addEventListener('click', (e) => {
  document.querySelector('.addTeacherForm').classList.toggle('d-none');
});
document.querySelector('.addForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name_add').value;
  const username = document.querySelector('#username_add').value;
  const email = document.querySelector('#email_add').value;
  const password = document.querySelector('#password_add');
  const passwordConfirm = document.querySelector('#passwordConfirm_add').value;
  const photo = document.querySelector('#formFile_add').value;
  const subjectId = document.querySelector('#subjectId_add');
  addTeacherFunc(
    name,
    username,
    email,
    password,
    passwordConfirm,
    photo,
    subjectId
  );
  document.querySelector('.addTeacherForm').classList.toggle('d-none');
  document.querySelector('.editTeacherForm').classList.add('d-none');
});

const editTeacherFunc = async (
  name,
  username,
  email,
  photo,
  password,
  subjectId
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/:id',
      data: {
        name,
        username,
        email,
        photo,
        password,
        subjectId: [subjectId],
      },
    });
  } catch (err) {
    console.log(err);
  }
};

editTeacherBtn.addEventListener('click', () => {
  console.log('hello');
  document.querySelector('.editTeacherForm').classList.toggle('d-none');
  document.querySelector('.addTeacherForm').classList.add('d-none');
});
document.querySelector('.editForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name_edit').value;
  const username = document.querySelector('#username_edit').value;
  const email = document.querySelector('#email_edit').value;
  const password = document.querySelector('#password_edit');
  const passwordConfirm = document.querySelector('#passwordConfirm_edit').value;
  const photo = document.querySelector('#formFile_edit').value;
  const subjectId = document.querySelector('#subjectId_edit');
  addTeacherFunc(
    name,
    username,
    email,
    password,
    passwordConfirm,
    photo,
    subjectId
  );
  document.querySelector('.editTeacherForm').classList.toggle('d-none');
});
