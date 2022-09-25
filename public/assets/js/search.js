const searchForm = document.querySelector('#searchForm');
const urlPath = document.querySelector('#urlPath').value;
const searchInput = document.getElementById('#searchInput');

searchForm.addEventListener('submit', (e) => {
  const urlPath = document.querySelector('#urlPath').value;
  const searchInput = document.querySelector('#searchInput').value;
  const url = urlPath + '?search=' + searchInput;
  console.log(url);
  e.preventDefault();
  window.setTimeout(() => {
    location.assign(`${url}`);
  }, 500);
});
