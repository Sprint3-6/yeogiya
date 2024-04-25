import { ChangeEvent, useState } from 'react';
import { ImageUploaderProps } from '../../types';
import './style.scss';

export default function ImageUploader({ id, images, setImages, maxImageCount = 1, isSubmitted }: ImageUploaderProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, maxImageCount);
    setImages(newImages);

    const newPreviewImages = newImages.map((image) => URL.createObjectURL(image));
    setPreviewImages(newPreviewImages);
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  return (
    <div className={`image-uploader-box ${isSubmitted && images.length === 0 ? 'form-error' : ''}`}>
      {/* 이미지 미리보기 */}
      {previewImages.map((preview, index) => (
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
          display: previewImages.length === maxImageCount ? 'none' : 'block',
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
