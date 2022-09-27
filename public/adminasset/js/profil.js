const update_user = async (name, username, email, photo) => {
  try {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('photo', photo);
    console.log('mnana biz resni oldidamiz');
    const res = await axios({
      method: 'PATCH',
      url: 'https://mironshox.ml/api/v1/users/updateMe',
      data: formData,
    });
    console.log(res, 'RESPONE');
    if (res.status === 201) {
      console.log('hello');
      alert('You logged successfully');
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};
console.log('hello');
const update_Password = async (password, newPassword, passwordConfirm) => {
  try {
    let formData = new FormData();
    formData.append('password', password);
    formData.append('newPassword', newPassword);
    formData.append('passwordConfirm', passwordConfirm);
    console.log('mnana biz resni oldidamiz');
    const res = await axios({
      method: 'PATCH',
      url: 'https://mironshox.ml/api/v1/users/updatePassword',
      data: {
        password: password,
        newPassword: newPassword,
        passwordConfirm: passwordConfirm,
      },
    });
    if (res.status === 200) {
      console.log(res);
      alert('You logged successfully');
      window.setTimeout(() => {
        window.reload();
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('#save_data').addEventListener('click', (e) => {
  console.log('salom');
  e.preventDefault();
  const name = document.querySelector('#name_user').value;
  const username = document.querySelector('#username_user').value;
  const email = document.querySelector('#email_user').value;
  const photo = document.querySelector('#photo_user').files[0];
  console.log(name, username, email);
  console.log(photo, 'mana photo');

  update_user(name, username, email, photo);
});

document.querySelector('#userPassword').addEventListener('click', (e) => {
  e.preventDefault();
  const password = document.querySelector('#password_user').value;
  const newPassword = document.querySelector('#newPassword_user').value;
  const passwordConfirm = document.querySelector('#newPass_Confirm_user').value;
  console.log(password, newPassword, passwordConfirm, ' Passwordlar ');
  update_Password(password, newPassword, passwordConfirm);
});
