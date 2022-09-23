// const { default: axios } = require('axios');
let addTeacherBtn = document.querySelector('.addTeacher');
let editTable = document.querySelector('.table-column');
const enterSystem = async (name, photo) => {
  try {
    let formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', name);
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/subjects/',
      data: formData,
    });
    console.log(res);
    if (res.status === 201) {
      alert('Ok');
      window.setTimeout(() => {
        location.reload('/admin/teachers');
      }, 100);
    }
  } catch (err) {
    console.log(err.response.data.message);
    alert(`Error: ${err.response.data.message}`);
  }
};

document.querySelector('#btn-add').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const photo = document.querySelector('#photo').files[0];
  console.log(name);
  console.log(photo);
  enterSystem(name, photo);
});
addTeacherBtn.addEventListener('click', (e) => {
  document.querySelector('.addTeacherForm').classList.toggle('d-none');
});

editTable.addEventListener('click', async (e) => {
  console.log('hello');
  e.preventDefault();
  console.log(e.target, 'e target');
  if (e.target.classList.contains('editTeacher')) {
    document.querySelector('.editTeacherForm').classList.toggle('d-none');
    document.querySelector('.addTeacherForm').classList.add('d-none');
    // console.log(editTable.value, 'mana valuesi');
    let value = e.target.getAttribute('value');
    console.log(value, 'value');
    try {
      const subject = await axios({
        method: 'GET',
        url: `http://localhost:8000/api/v1/subjects/${value}`,
      });
      console.log(subject);
      document.querySelector('#name_edit').value = subject.data.data.name;
      document.querySelector('.editTeacherForm').value = subject.data.data._id;
      console.log(document.querySelector('.editTeacherForm').value, 'mana');
      // document.querySelector('#formFile_edit').value = subject.data.data.name;
    } catch (err) {
      alert(err);
    }
  } else if (e.target.classList.contains('deleteTeacher')) {
    let value = e.target.getAttribute('value');
    try {
      const subject = await axios({
        method: 'DELETE',
        url: `http://localhost:8000/api/v1/subjects/${value}`,
      });
      console.log(subject.data);
      window.setTimeout(() => {
        location.reload();
      }, 100);

      // document.querySelector('#name_edit').value = subject.data.data.name;
      // document.querySelector('.editTeacherForm').value = subject.data.data._id;
      // document.querySelector('#formFile_edit').value = subject.data.data.name;
    } catch (err) {
      alert(err);
    }
  } // document.querySelector('.addTeacherForm').classList.add('d-none');
});

document.querySelector('.editForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name_edit').value;
  const photo = document.querySelector('#formFile_edit').files[0];
  const subjectId = document.querySelector('.editTeacherForm').value;
  console.log(name, photo, 'datas');
  editTeacherFunc(name, photo, subjectId);
  // window.reload();
  // document.querySelector('.editTeacherForm').classList.toggle('d-none');
});

const editTeacherFunc = async (name, photo, subjectId) => {
  try {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);
    console.log('resdan oldin');
    const res = await axios.patch(
      `http://localhost:8000/api/v1/subjects/${subjectId}`,
      formData
    );
    console.log(res.data.data, 'RESPONE');
    window.setTimeout(() => {
      location.reload();
    }, 100);
  } catch (err) {
    console.log(err);
  }
};
