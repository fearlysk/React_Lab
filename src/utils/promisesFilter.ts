export default function promisesFilter(promises: Promise<string>[]) {
  return Promise.allSettled(promises)
    .then((data) =>
      data.map((item) => {
        if (item.status === "fulfilled") {
          return item.value;
        }
        return null;
      })
    )
    .then((data) => data.filter((item) => !!item))
    .then((data) => Promise.all(data));
}
