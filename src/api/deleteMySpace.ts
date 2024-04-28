import { BASE_URL } from './constants/url';
import instance from './instance/defaultInstance';

async function deleteMySpace(id: string | undefined) {
  await instance.delete(`${BASE_URL}my-activities/${id}`);
}

export default deleteMySpace;
