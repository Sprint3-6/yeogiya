export interface DetailType {
  address: string;
  bannerImageUrl: string;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  reviewCount: number;
  schedules: [
    {
      id: number;
      date: string;
      startTime: string;
      endTime: string;
    },
  ];
  subImages: [
    {
      id: number;
      imageUrl: string;
    },
  ];
  title: string;
  updatedAt: string;
  userId: number;
}

export interface ReviewType {
  activityId: number;
  content: string;
  createdAt: string;
  id: number;
  rating: number;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string | undefined;
  };
}

export type DeleteModalType = {
  closeModal: () => void;
  title: string | undefined;
  id: string | undefined;
};

interface TimesType {
  id: number;
  startTime: string;
  endTime: string;
}

export interface ScheduleType {
  date: string;
  times: TimesType[];
}

export interface CalendarContainerType {
  id: string | undefined;
  detail: DetailType | undefined;
}

export type ToLoginModalType = {
  closeModal: () => void;
};

export interface CalendarTabletType {
  closeModal: () => void;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedDateString: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleMonthChange: (month: Date) => void;
  schedule: ScheduleType[] | undefined;
  selectedSchedule: number | null;
  handleSelectedSchedule: (id: number) => void;
  setOpenedSchedule: () => Promise<void>;
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
}
