function fetchData(url: string) {
  return fetch(url).then((res) => res.json());
}

export default fetchData;
