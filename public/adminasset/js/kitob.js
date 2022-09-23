// const { json } = require('body-parser');

let addTeacherBtn = document.querySelector('.addTeacher');
let editTable = document.querySelector('.table-column');
let spinner = document.getElementById('spinner');

const enterSystem = async (name, file, subject) => {
  console.log(file, 'mana file');
  let formData = new FormData();
  formData.append('file', file);
  formData.append('subjectId', subject);
  formData.append('name', name);
  axios({
    method: 'POST',
    url: 'http://localhost:8000/api/v1/files/',
    data: formData,
  })
    .then(function (val) {
      spinner.style.visibility = 'visible';
      spinner.style.opacity = '1';
      console.log(val, 'qalaysan bu men');
      return JSON.stringify(val);
    })
    .then(function (data) {
      spinner.style.visibility = 'hidden';
      spinner.style.opacity = '0';
      console.log(data, '_data');
      data = JSON.parse(data);
      if (data.status === 201 || data.status === 302) {
        // alert('Ok');
        window.setTimeout(() => {
          // location.reload();
          console.log('men reloadman');
        }, 100);
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
      alert(`Error: ${err.response.data.message}`);
    });
  // console.log(res);
};

document.querySelector('#btn-add').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const file = document.querySelector('#photo').files[0];
  const subject = document.querySelector('#subject').value;
  console.log(name);
  console.log(file);
  console.log(subject);
  enterSystem(name, file, subject);
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
        url: `http://localhost:8000/api/v1/files/${value}`,
      });
      console.log(subject);
      document.querySelector('#name_edit').value = subject.data.data.name;
      // document.querySelector('#subject-edit').value = subject.data.data.subjectId.name;
      document.querySelector('.editTeacherForm').value = subject.data.data._id;
      // document.querySelector('#formFile_edit').value = subject.data.data.name;
    } catch (err) {
      alert(err);
    }
  } else if (e.target.classList.contains('deleteTeacher')) {
    let value = e.target.getAttribute('value');
    try {
      console.log(value, '_value');
      const subject = await axios.delete(
        `http://localhost:8000/api/v1/subjects/${value}`,
        { Authorization: 'Bearer token', 'My-Custom-Header': 'foobar' }
      );
      console.log(subject);
      window.setTimeout(() => {
        location.reload();
      }, 100);

      // document.querySelector('#name_edit').value = subject.data.data.name;
      // document.querySelector('.editTeacherForm').value = subject.data.data._id;
      // document.querySelector('#formFile_edit').value = subject.data.data.name;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  } // document.querySelector('.addTeacherForm').classList.add('d-none');
});

document.querySelector('.editForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name_edit').value;
  const file = document.querySelector('#formFile_edit').value;
  const subjectId = document.querySelector('#subject-edit').value;
  const fileId = document.querySelector('.editTeacherForm').value;
  console.log(name, file, 'datas');
  editTeacherFunc(name, file, subjectId, fileId);
  // window.reload();
  // document.querySelector('.editTeacherForm').classList.toggle('d-none');
});

const editTeacherFunc = async (name, file, subjectId, fileId) => {
  try {
    console.log('resdan oldin');
    let formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    formData.append('subjectId', subjectId);
    const res = await axios.patch(
      `http://localhost:8000/api/v1/files/${fileId}`,
      formData
    );
    console.log(res.data.data, 'RESPONE');
    window.setTimeout(() => {
      location.reload();
    }, 100);
  } catch (err) {
    console.log(err, "error bo'ldi");
  }
};
