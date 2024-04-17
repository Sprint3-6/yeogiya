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
