interface IParams {
  [key: string]: string | number;
}

export default function objectToGetParams(params: IParams) {
  return `?${Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&")}`;
}
