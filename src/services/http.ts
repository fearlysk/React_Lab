const http = async (url: string) => {
  try {
    const response = await fetch(`http://localhost:3000/${url}`);
    return response.json();
  } catch (err) {
    return new Error("Data fetching error");
  }
};

export default http;
