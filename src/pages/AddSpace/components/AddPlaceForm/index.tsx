import KakaoPostSearch from '../KakaoPostSearch';
import ImageUploader from '../ImageUploader';
import './style.scss';
import PriceInput from '../PriceInput';
import TitleInput from '../TitleInput';
import DescriptionInput from '../DescriptionInput';
import Schedules from '../Schdules';
import CategoryDropdown from '../CategoryDropdown';
import Button from '@/components/Button';
import useAddPlaceForm from '@/hooks/useAddPlaceForm';

export default function AddPlaceForm() {
  const {
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
    setCategory,
    isSubmitted,
  } = useAddPlaceForm();

  return (
    <form className="place-form-box" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="form-header">
        <h1 className="add-place-title">내 공간 등록</h1>
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
