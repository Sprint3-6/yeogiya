import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from '@/utils/toast';
import { Schedule } from '@/api/types/myActivities';
import { findMissingImgIds, findMissingScheduleIds, findNewImgUrl, findNewScheduleData } from '@/utils/findMissingIds';
import removeCommas from '@/utils/removeCommas';
import getSpaceDetail, { SchedulePlusId, SpaceDetail } from '@/api/getSpaceDetail';
import { editMyActivities } from '@/api/myActivitiesApi';
import { PlaceInputValue } from '@/pages/AddSpace/types';
import { ErrorType } from '@/api/types/axiosErrorType';

interface UrlSubData {
  id: number;
  imageUrl: string;
}

export default function useEditSpaceForm() {
  const [bannerImage, setBannerImage] = useState<string[]>([]);
  const [subimages, setSubImages] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [category, setCategory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const preSubimages = useRef<UrlSubData[]>([]);
  const preSchedules = useRef<SchedulePlusId[]>([]);

  useEffect(() => {
    const fetchInitialValue = async () => {
      const initialValue = await getSpaceDetail(id, navigate);
      if (initialValue) {
        setInitialFormValues(initialValue);
      }
    };
    fetchInitialValue();
  }, []);

  const setInitialFormValues = (initialValue: SpaceDetail) => {
    setValue('title', initialValue.title);
    setValue('description', initialValue.description);
    setCategory(initialValue.category);
    setValue('price', initialValue.price.toString());
    setValue('address', initialValue.address);
    setSchedules(
      initialValue.schedules.map((schedule: Schedule) => {
        return { date: schedule.date, startTime: schedule.startTime, endTime: schedule.endTime };
      }),
    );
    setBannerImage([initialValue.bannerImageUrl]);
    setSubImages([...initialValue.subImages.map((subData: UrlSubData) => subData.imageUrl)]);
    preSubimages.current = initialValue.subImages;
    preSchedules.current = initialValue.schedules;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<PlaceInputValue>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<PlaceInputValue> = async (data) => {
    setIsSubmitted(true);
    if (!category) {
      toast.warning('카테고리를 선택해주세요!');
    } else if (schedules.length === 0) {
      toast.warning('스케줄을 하나 이상 추가해 주세요!');
    } else if (bannerImage.length === 0) {
      toast.warning('배너 이미지를 넣어 주세요!');
    } else {
      const body = {
        title: data.title,
        category: category,
        description: data.description,
        price: parseInt(removeCommas(data.price)),
        address: data.address,
        schedulesToAdd: findNewScheduleData(preSchedules.current, schedules),
        bannerImageUrl: bannerImage[0],
        subImageUrlsToAdd: findNewImgUrl(preSubimages.current, subimages),
        subImageIdsToRemove: findMissingImgIds(preSubimages.current, subimages),
        scheduleIdsToRemove: findMissingScheduleIds(preSchedules.current, schedules),
      };
      try {
        await editMyActivities(id!, body);
        toast.success('수정이 되었습니다!');
        navigate('/mypage/admin');
      } catch (err) {
        const error = err as ErrorType;
        toast.error(error.response.data.message);
      }
    }
    return;
  };

  const onError: SubmitErrorHandler<PlaceInputValue> = (errors) => {
    if (errors.title) {
      toast.warning(`제목을 적어주세요!`);
    } else if (errors.description) {
      toast.warning(`설명을 적어주세요!`);
    } else if (errors.price) {
      toast.warning(`가격을 적어주세요!`);
    } else if (errors.address) {
      toast.warning(`주소를 적어주세요!`);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    getValues,
    onSubmit,
    onError,
    bannerImage,
    setBannerImage,
    subimages,
    setSubImages,
    schedules,
    setSchedules,
    category,
    setCategory,
    isSubmitted,
  };
}
