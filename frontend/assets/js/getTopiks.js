const getTopics = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/subjects/',
    });
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};
