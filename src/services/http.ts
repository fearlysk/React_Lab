const http = async (url: string, method?: string, data?: object) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASEURL}${url}`, {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    return new Error("Data fetching error");
  }
};
export default http;
