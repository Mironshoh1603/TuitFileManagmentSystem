const searchForm = document.querySelector('#searchForm');
console.log('searchadmin js');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const urlPath = document.querySelector('#urlPath').value;
  console.log(urlPath);

  const searchInput = document.querySelector('#searchInput').value;
  const url = urlPath + '?search=' + searchInput;
  console.log(url);
  window.setTimeout(() => {
    location.assign(`${url}`);
  }, 500);
});
