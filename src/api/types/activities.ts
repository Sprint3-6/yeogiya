interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface CreateActivityBody {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface MyActivitiesList {
  activities: ActivityBasic[];
  totalCount: number;
  cursorId: number;
}

export interface ActivityBasic {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
