const http = async (url: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASEURL}${url}`);
    return response.json();
  } catch (err) {
    return new Error("Data fetching error");
  }
};

export default http;
