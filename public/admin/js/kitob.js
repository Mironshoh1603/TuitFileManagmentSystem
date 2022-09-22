// // const axios = require('axios');
// const bookadd = async (formData) => {
//   try {
//     const data = { ustoz, mavzu, file, names };

//     const dat = await fetch('http://localhost:8000/api/v1/files', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((dataw) => {
//         console.log('Success:', dataw);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//     // console.log('adddddddddddddd', res);
//     if (res.status === 200) {
//       alert('you have entered system succesfully');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1000);
//     }
//     console.log('dattttttttttttt', dat);
//   } catch (error) {
//     // console.log(error.message);
//   }

//   // console.log('salom');
// };

// console.log('hello');
// document.querySelector('#qow').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const ustoz = document.querySelector('#ustoz').value;
//   const mavzu = document.querySelector('#mavzu').value;
//   const file = document.querySelector('#file').files[0];
//   const names = document.querySelector('#names').value;

//   let formData = new FormData();
//   formData.append('ustoz', ustoz);
//   formData.append('mavzu', mavzu);
//   formData.append('names', names);
//   formData.append('file', file);
//   bookadd(formData);

//   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', ustoz, mavzu, file, names);
// });

const bookadd = async (ustoz, mavzu, file, names) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/files/',
      data: {
        ustoz: ustoz,
        mavzu: mavzu,
        file: file,
        names: names,
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
    console.log(err.message);
    alert(`Error: ${err.message}`);
  }
};

document.querySelector('#qosh').addEventListener('click', (e) => {
  e.preventDefault();
  const ustoz = document.querySelector('#ustoz').value;
  const mavzu = document.querySelector('#mavzu').value;
  const file = document.querySelector('#file').files[0];
  const names = document.querySelector('#names').value;
  console.log(ustoz);
  console.log(mavzu);
  console.log(file);
  console.log(names);

  bookadd(ustoz, mavzu, file, names);
});
