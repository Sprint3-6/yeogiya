import { useNavigate, useParams } from 'react-router-dom';
import { PlaceInputValue } from '../AddSpace/types';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import TitleInput from '../AddSpace/comnponents/TitleInput';
import DescriptionInput from '../AddSpace/comnponents/DescriptionInput';
import PriceInput from '../AddSpace/comnponents/PriceInput';
import KakaoPostSearch from '../AddSpace/comnponents/KakaoPostSearch';
import ImageUploader from '../AddSpace/comnponents/ImageUploader';
import toast from '@/utils/toast';
import CategoryDropdown from '../AddSpace/comnponents/CategoryDropdown';
import Schedules from '../AddSpace/comnponents/Schdules';
import { Schedule } from '@/api/types/myActivities';
import getSpaceDetail from '@/api/getSpaceDetail';
import { findMissingImgIds, findMissingScheduleIds, findNewImgUrl, findNewScheduleData } from '@/utils/findMissingIds';
import { editMyActivities } from '@/api/myActivitiesApi';
import removeCommas from '@/utils/removeCommas';
import './styles.scss';

interface UrlSubData {
  id: number;
  imageUrl: string;
}

export default function EditSpace() {
  const [bannerImage, setBannerImage] = useState<string[]>([]);
  const [subimages, setSubImages] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [category, setCategory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const preSubimages = useRef([]);
  const preSchedules = useRef([]);

  useEffect(() => {
    const handleinitialValue = async () => {
      const initialValue = await getSpaceDetail(id, navigate);
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
    handleinitialValue();
  }, []);

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
        schedulesToAdd: findNewScheduleData(preSchedules.current, schedules),
        bannerImageUrl: bannerImage[0],
        subImageUrlsToAdd: findNewImgUrl(preSubimages.current, subimages),
        subImageIdsToRemove: findMissingImgIds(preSubimages.current, subimages),
        scheduleIdsToRemove: findMissingScheduleIds(preSchedules.current, schedules),
      };
      editMyActivities(id!, body).then(() => {
        // 업로드 성공 시 페이지 이동
        toast.success('수정이 되었습니다!');
        navigate('/mypage/admin');
      });
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

  return (
    <form className="place-form-box" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="form-header">
        <h1 className="edit-space-title">편집하기</h1>
        <button className="form-button button-black" type="submit" disabled={isSubmitting}>
          등록하기
        </button>
      </div>
      <section className="form-content">
        <TitleInput register={register} />
        <span className="input-title">카테고리</span>
        <CategoryDropdown setCategory={setCategory} initValue={category} />
        <DescriptionInput register={register} />
        <PriceInput register={register} />
        <KakaoPostSearch register={register} setValue={setValue} error={!!errors.address} getValues={getValues} />
        <span className="input-title">예약 가능 시간대</span>
        <Schedules schedules={schedules} setSchedules={setSchedules} />
        <span className="input-title">배너 이미지</span>
        <ImageUploader
          id="bannerImage"
          images={bannerImage}
          setImages={setBannerImage}
          isSubmitted={isSubmitted}
          maxImageCount={1}
        />
        <span className="input-title">소개 이미지</span>
        <ImageUploader id="subImages" images={subimages} setImages={setSubImages} maxImageCount={4} />
      </section>
    </form>
  );
}
