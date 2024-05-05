import { ChangeEvent } from 'react';
import { ImageUploaderProps } from '../../types';
import './style.scss';
import { uploadImage } from '@/api/activitiesApi';

export default function ImageUploader({ id, images, setImages, maxImageCount = 1, isSubmitted }: ImageUploaderProps) {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    const newImages = await Promise.all(newFiles.map(uploadImage));
    setImages([...images, ...newImages].slice(0, maxImageCount));
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className={`image-uploader-box ${isSubmitted && images.length === 0 ? 'form-error' : ''}`}>
      {/* 이미지 미리보기 */}
      {images.map((preview, index) => (
        <div
          className="preview-image-box"
          key={index}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <img className="preview-image" src={preview} alt={` preview ${index + 1}`} />
          <img className="delete-image" src="/assets/icons/icon-image-delete.svg" onClick={() => handleRemove(index)} />
        </div>
      ))}
      {/* 이미지 업로드 버튼 */}
      <label
        htmlFor={id}
        className="preview-image"
        style={{
          display: images.length === maxImageCount ? 'none' : 'block',
        }}
      >
        <img alt="이미지 추가" src="/assets/images/add-img-button.png" />
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none', visibility: 'hidden' }}
        onChange={handleChange}
      />
    </div>
  );
}
