const enterSystem = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://mironshox.ml/api/v1/users/signin/',
      data: {
        email: email,
        password: password,
      },
    });
    console.log(res);
    if (res.status === 200) {
      alert('you have entered system succesfully');
      window.setTimeout(() => {
        location.assign('/admin');
      }, 500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    alert(`Error: ${err.response.data.message}`);
  }
};

document.querySelector('.btn-login').addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  console.log(email);
  console.log(password);
  enterSystem(email, password);
});
