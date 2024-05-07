import TitleInput from '../AddSpace/components/TitleInput';
import DescriptionInput from '../AddSpace/components/DescriptionInput';
import PriceInput from '../AddSpace/components/PriceInput';
import KakaoPostSearch from '../AddSpace/components/KakaoPostSearch';
import ImageUploader from '../AddSpace/components/ImageUploader';
import CategoryDropdown from '../AddSpace/components/CategoryDropdown';
import Schedules from '../AddSpace/components/Schdules';
import './styles.scss';
import useEditSpaceForm from '@/hooks/useEditSpaceForm';

export default function EditSpace() {
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
    category,
    setCategory,
    isSubmitted,
  } = useEditSpaceForm();

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
