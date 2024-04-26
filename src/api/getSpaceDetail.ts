import { BASE_URL } from './constants/url';
import instance from './instance/defaultInstance';

async function getSpaceDetail(id: string | undefined) {
  const detail = await instance.get(`${BASE_URL}activities/${id}`);
  return detail.data;
}

export default getSpaceDetail;
