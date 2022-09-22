const addTeacherFunc = async (
  name,
  username,
  email,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/',
      data: {
        name,
        username,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.status === 201 || 302) {
      console.log('hello');
      alert('You logged successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    alert(err.data.message);
  }
};
let editTeacherTable = document.querySelector('.table-teacher');
let addTeacherBtn = document.querySelector('.addTeacher');
addTeacherBtn.addEventListener('click', (e) => {
  document.querySelector('.addTeacherForm').classList.toggle('d-none');
});
document.querySelector('.addForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name_add').value;
  const username = document.querySelector('#username_add').value;
  const email = document.querySelector('#email_add').value;
  const password = document.querySelector('#password_add').value;
  const passwordConfirm = document.querySelector('#passwordConfirm_add').value;
  const subjectId = document.querySelector('#subjectId_add');
  console.log(password);
  addTeacherFunc(name, username, email, password, passwordConfirm);
  document.querySelector('.addTeacherForm').classList.toggle('d-none');
  document.querySelector('.editTeacherForm').classList.add('d-none');
});

let editTeacherBtn = document.querySelector('.editTeacher');

editTeacherTable.addEventListener('click', async (e) => {
  console.log('hello');
  console.log(e.target);
  if (e.target.classList.contains('editTeacher')) {
    document.querySelector('.editTeacherForm').classList.toggle('d-none');
    document.querySelector('.addTeacherForm').classList.add('d-none');
    // console.log(editTable.value, 'mana valuesi');
    let value = e.target.getAttribute('value');
    console.log(value, 'value');
    try {
      const teacher = await axios({
        method: 'GET',
        url: `http://localhost:8000/api/v1/users/${value}`,
      });
      console.log(teacher);
      document.querySelector('#name_edit').value = teacher.data.data.name;
      document.querySelector('#username_edit').value =
        teacher.data.data.username;
      document.querySelector('#email_edit').value = teacher.data.data.email;
      document.querySelector('#formFile_edit').value = teacher.data.data.photo;
      document.querySelector('#password_edit').value =
        teacher.data.data.password;
      document.querySelector('#passwordConfirm_edit').value =
        teacher.data.data.passwordConfirm;
      document.querySelector('.editTeacherForm').value = teacher.data.data._id;
      // document.querySelector('#formFile_edit').value = subject.data.data.name;
    } catch (err) {
      alert(err);
    }
  } else if (e.target.classList.contains('deleteTeacher')) {
    let value = e.target.getAttribute('value');
    try {
      const teacher = await axios({
        method: 'DELETE',
        url: `http://localhost:8000/api/v1/users/${value}`,
      });
      console.log(teacher.data);
      window.setTimeout(() => {
        location.reload();
      }, 100);

      // document.querySelector('#name_edit').value = subject.data.data.name;
      // document.querySelector('.editTeacherForm').value = subject.data.data._id;
      // document.querySelector('#formFile_edit').value = subject.data.data.name;
    } catch (err) {
      alert(err);
    }
  }
});
document.querySelector('.editForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name_edit').value;
  const username = document.querySelector('#username_edit').value;
  const email = document.querySelector('#email_edit').value;
  const password = document.querySelector('#password_edit');
  const passwordConfirm = document.querySelector('#passwordConfirm_edit').value;
  const photo = document.querySelector('#formFile_edit').value;
  const teacherId = document.querySelector('.editTeacher').value;
  editTeacherFunc(
    name,
    username,
    email,
    password,
    passwordConfirm,
    photo,
    teacherId
  );
  document.querySelector('.editTeacherForm').classList.toggle('d-none');
});
const editTeacherFunc = async (
  name,
  username,
  email,
  photo,
  password,
  subjectId,
  teacherId
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:8000/api/v1/users/:${teacherId}`,
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
