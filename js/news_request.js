const getNews = async() => {
    const url = `https://newsboxbot.herokuapp.com/moduleaccess/401714040/`
    try {
      const response = await fetch(url);
      return response.json();
    } catch(e) {
      console.log(e);
      return [];
    }
}
