import { useState } from 'react';
import { PlaceInputValue } from '../../types';
import { SubmitHandler, useForm } from 'react-hook-form';
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

    if (bannerImage.length > 0 && category && schedules.length > 0) {
      const body = {
        title: data.title,
        category: category,
        description: data.description,
        price: parseInt(data.price),
        address: data.address,
        schedules: schedules,
        bannerImageUrl: bannerImage[0],
        subImageUrls: subimages,
      };
      postData(body).then(() => {
        // 업로드 성공 시 페이지 이동
        navigate('/mypage/admin');
      });
    } else {
      toast.warning('필수사항을 입력하세요!');
      return;
    }
  };

  return (
    <form className="place-form-box" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        <h2>내 체험 등록</h2>
        <button className="form-button" type="submit" disabled={isSubmitting}>
          등록하기
        </button>
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
