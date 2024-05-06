import { BASE_URL } from './constants/url';
import { ErrorType } from './types/axiosErrorType';
import instance from './instance/defaultInstance';
import toast from '@/utils/toast';
import { Schedule } from './types/myActivities';

interface SubImageUrls {
  id: number;
  imageUrl: string;
}

export interface SchedulePlusId extends Schedule {
  id: number;
}

export interface SpaceDetail {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: SubImageUrls[];
  schedules: SchedulePlusId[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

async function getSpaceDetail(id: string | undefined, navigate: (path: string) => void) {
  try {
    const detail = await instance.get(`${BASE_URL}activities/${id}`);
    return detail.data;
  } catch (err) {
    const error = err as ErrorType;
    toast.error(error.response.data.message);
    navigate('/');
  }
}

export default getSpaceDetail;
