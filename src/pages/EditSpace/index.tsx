import { useParams } from 'react-router-dom';
import { PlaceInputValue } from '../AddSpace/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { uploadImageAndPostData } from '@/api/myActivitiesApi';
import TitleInput from '../AddSpace/comnponents/TitleInput';
import DescriptionInput from '../AddSpace/comnponents/DescriptionInput';
import PriceInput from '../AddSpace/comnponents/PriceInput';
import KakaoPostSearch from '../AddSpace/comnponents/KakaoPostSearch';
import ImageUploader from '../AddSpace/comnponents/ImageUploader';

export default function EditSpace() {
  const { id } = useParams();
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
        <h2>{id}</h2>
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
  return <main>공간수정하기 페이지.</main>;
}
