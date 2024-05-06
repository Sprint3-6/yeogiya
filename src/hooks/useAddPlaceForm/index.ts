import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from '@/utils/toast';
import { postData } from '@/api/activitiesApi';
import removeCommas from '@/utils/removeCommas';
import { Schedule } from '@/api/types/myActivities';
import { PlaceInputValue } from '@/pages/AddSpace/types';

export default function useAddPlaceForm() {
  const [bannerImage, setBannerImage] = useState<string[]>([]);
  const [subimages, setSubImages] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [category, setCategory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<PlaceInputValue>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<PlaceInputValue> = (data) => {
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
        schedules: schedules,
        bannerImageUrl: bannerImage[0],
        subImageUrls: subimages,
      };
      postData(body).then(() => {
        // 업로드 성공 시 페이지 이동
        navigate('/mypage/admin');
      });
    }
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
