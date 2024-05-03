import { useState } from 'react';
import { PlaceInputValue } from '../../types';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import KakaoPostSearch from '../KakaoPostSearch';
import ImageUploader from '../ImageUploader';
import './style.scss';
import PriceInput from '../PriceInput';
import TitleInput from '../TitleInput';
import DescriptionInput from '../DescriptionInput';
import Schedules from '../Schdules';
import { Schedule } from '@/api/types/myActivities';
import CategoryDropdown from '../CategoryDropdown';
import { useNavigate } from 'react-router-dom';
import toast from '@/utils/toast';
import { postData } from '@/api/activitiesApi';
import Button from '@/components/Button';
import removeCommas from '@/utils/removeCommas';

export default function AddPlaceForm() {
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

  return (
    <form className="place-form-box" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="form-header">
        <h2>내 체험 등록</h2>
        <Button className="form-button button-black" type="submit" disabled={isSubmitting}>
          등록하기
        </Button>
      </div>
      <section className="form-content">
        <TitleInput register={register} />
        <span className="input-title">카테고리</span>
        <CategoryDropdown setCategory={setCategory} />
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
