import { BASE_URL } from './constants/url';
import instance from './instance/defaultInstance';

async function getUserReview(id: string | undefined, page: number) {
  const reviews = await instance.get(`${BASE_URL}activities/${id}/reviews?page=${page}&size=3`);
  return reviews.data.reviews;
}

export default getUserReview;
