import { BASE_URL } from './constants/url';
import instance from './instance/defaultInstance';
import { GetSpacesParam } from './types/activities';

async function getSpaces({ cursorId, category, keyword, sort, page = 1, size }: GetSpacesParam) {
  let path = '';
  if (cursorId) path += `&cursorId=${cursorId}`;
  if (category) path += `&category=${category}`;
  if (keyword) path += `&keyword=${keyword}`;
  if (sort) path += `&sort=${sort}`;

  const spaces = await instance.get(`${BASE_URL}activities?method=offset&page=${page}&size=${size}${path}`);
  return spaces.data;
}

export default getSpaces;
