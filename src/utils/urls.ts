interface IParams {
  [key: string | number]: string | undefined;
}

export default function objectToGetParams(params: IParams) {
  return `?${Object.keys(params)
    .map((key) => `${key}=${params[key]?.toString()}`)
    .join("&")}`;
}
