const enterSystem = async (name, photo) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/subjects/',
      data: {
        name: name,
        photo: photo,
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

document.querySelector('#btn-add').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const photo = document.querySelector('#photo').value;
  console.log(name);
  console.log(photo);
  enterSystem(name, photo);
});