const update_user = async (name, username, email, photo) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMe',
      data: {
        name,
        username,
        email,
        photo,
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
console.log('hello');

document.querySelector('#userData').addEventListener('submit', (e) => {
  console.log('salom');
  e.preventDefault();
  const name = document.querySelector('#name_user').value;
  const username = document.querySelector('#username_user').value;
  const email = document.querySelector('#email_user').value;
  update_user(name, username, email);
  console.log(name, username, email);
});
