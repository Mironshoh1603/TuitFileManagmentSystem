const update_user = async (name, username, email, photo) => {
  try {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('photo', photo);

    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMe',
      data: formData,
    });
    console.log(res.data.data, 'RESPONE');
    if (res.status === 200) {
      console.log('hello');
      alert('You logged successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};
console.log('hello');
const update_Password = async (password, newPassword, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'Patch',
      url: 'localhost:8000/api/v1/users/updatePassword',
      data: {
        password,
        newPassword,
        passwordConfirm,
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
    console.log(err);
  }
};

document.querySelector('#userData').addEventListener('submit', (e) => {
  console.log('salom');
  e.preventDefault();
  const name = document.querySelector('#name_user').value;
  const username = document.querySelector('#username_user').value;
  const email = document.querySelector('#email_user').value;
  const user_id = document.querySelector('#userData').value;
  update_user(name, username, email, user_id);
  console.log(name, username, email);
});

document.querySelector('#userPassword').addEventListener('submit', (e) => {
  e.preventDefault();
  const password = document.querySelector('#password_user').value;
  const newPassword = document.querySelector('#newPassword_user');
  const passwordConfirm = document.querySelector('#newPass_Confirm_user');
  update_Password(password, newPassword, passwordConfirm);
  console.log(password);
});
