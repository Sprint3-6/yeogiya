import { DescriptionInputProps } from '../../types';

export default function DescriptionInput({ register }: DescriptionInputProps) {
  return (
    <div className="input-box">
      <label htmlFor="description">설명</label>
      <textarea
        id="description"
        className="form-textarea"
        placeholder="설명"
        {...register('description', { required: true })}
      />
    </div>
  );
}
