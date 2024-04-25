import { uploadImageAndPostData } from '@/api/activitiesApi';
import { useState } from 'react';
import { PlaceInputValue } from '../../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import KakaoPostSearch from '../KakaoPostSearch';
import ImageUploader from '../ImageUploader';
import './style.scss';
import PriceInput from '../PriceInput';
import TitleInput from '../TitleInput';
import DescriptionInput from '../DescriptionInput';

export default function AddPlaceForm() {
  const [bannerImage, setBannerImage] = useState<File[]>([]);
  const [subimages, setSubImages] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<PlaceInputValue>();

  const onSubmit: SubmitHandler<PlaceInputValue> = (data) => {
    console.log(data);
    setIsSubmitted(true);
    if (bannerImage.length > 0) {
      const imageData = [...bannerImage, ...subimages];
      const body = {
        title: data.title,
        category: '스포츠', //임시
        description: data.description,
        price: parseInt(data.price),
        address: data.address,
        schedules: [], //임시
      };
      uploadImageAndPostData(body, imageData);
    } else {
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
        <DescriptionInput register={register} />
        <PriceInput register={register} />
        <KakaoPostSearch register={register} setValue={setValue} error={!!errors.address} getValues={getValues} />
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
