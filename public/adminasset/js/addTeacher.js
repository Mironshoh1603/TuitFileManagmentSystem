const addTeacherFunc = async (
  name,
  username,
  email,
  password,
  passwordConfirm,
  subjectId,
  photo
) => {
  try {
    let formData = new FormData();
    console.log(name, email, username, password, subjectId, ',smnkjcnskjvn');
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', passwordConfirm);
    formData.append('photo', photo);
    formData.append('subjects', subjectId);
    console.log('form Data', formData);

    const res = await axios.post(
      'https://mironshox.ml/api/v1/users/',
      formData
    );
    console.log(res);
    if (res.status === 201) {
      alert('okay');
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    alert(err);
    console.log(err);
    console.log(err.message);
  }
};
console.log('hello');

let editTeacherTable = document.querySelector('.table-column');
let addTeacherBtn = document.querySelector('.addTeacher');
addTeacherBtn.addEventListener('click', (e) => {
  document.querySelector('.addTeacherForm').classList.toggle('d-none');
  document.querySelector('.editTeacherForm').classList.add('d-none');
});
document.querySelector('.addForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name_add').value;
  const username = document.querySelector('#username_add').value;
  const email = document.querySelector('#email_add').value;
  const password = document.querySelector('#password_add').value;
  const passwordConfirm = document.querySelector('#passwordConfirm_add').value;
  console.log('------', document.querySelector('#subjectId_add'));
  const subjectId = document.querySelector('#subjectId_add').value;
  const photo = document.querySelector('#formFile_add').files[0];
  console.log(subjectId, '_subjects');
  addTeacherFunc(
    name,
    username,
    email,
    password,
    passwordConfirm,
    subjectId,
    photo
  );
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
    console.log(value, 'value mana');
    try {
      const teacher = await axios({
        method: 'GET',
        url: `https://mironshox.ml/api/v1/users/${value}`,
      });
      console.log(teacher);
      document.querySelector('#name_edit').value = teacher.data.data.name;
      document.querySelector('#username_edit').value =
        teacher.data.data.username;
      document.querySelector('#email_edit').value = teacher.data.data.email;
      document.querySelector('#subject_edit').value =
        teacher.data.data.subjects[0];
      // document.querySelector('#formFile_edit').value = teacher.data.data.photo;
      // document.querySelector('#password_edit').value =
      //   teacher.data.data.password;
      // document.querySelector('#passwordConfirm_edit').value =
      //   teacher.data.data.passwordConfirm;
      document.querySelector('.editTeacherForm').value = teacher.data.data._id;
      console.log(document.querySelector('#name_edit').value, 'Mana value');
      // document.querySelector('#formFile_edit').value = subject.data.data.name;
    } catch (err) {
      alert(err);
    }
  } else if (e.target.classList.contains('deleteTeacher')) {
    let value = e.target.getAttribute('value');
    try {
      const teacher = await axios({
        method: 'DELETE',
        url: `https://mironshox.ml/api/v1/users/${value}`,
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
  const photo = document.querySelector('#formFile_edit').files[0];
  console.log(document.querySelector('#subject_edit') + 'subjectId');

  const subjectId = document.querySelector('#subject_edit').value;
  const teacherId = document.querySelector('.editTeacherForm').value;
  console.log('TeacherID', teacherId);
  editTeacherFunc(name, username, email, photo, subjectId, teacherId);
  document.querySelector('.editTeacherForm').classList.toggle('d-none');
});
const editTeacherFunc = async (
  name,
  username,
  email,
  photo,
  subjectId,
  teacherId
) => {
  console.log("o'zgargan name", name);
  let formData = new FormData();
  formData.append('name', name);
  formData.append('username', username);
  formData.append('email', email);
  formData.append('photo', photo);
  formData.append('subjects', [subjectId]);
  let subjects = subjectId;
  try {
    console.log(formData, 'Manabu Formda');
    const res = await axios.patch(
      `https://mironshox.ml/api/v1/users/${teacherId}`,
      {
        name,
        username,
        email,
        photo,
        subjects,
      }
    );
    console.log(res.data.data);
    if (res.status === 202) {
      window.setTimeout(() => {
        location.reload();
      }, 100);
    }
  } catch (err) {
    console.log(err);
  }
};
