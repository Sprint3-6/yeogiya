import { TitleInputProps } from '../../types';

export default function TitleInput({ register }: TitleInputProps) {
  return (
    <div className="input-box">
      <label htmlFor="title">제목</label>
      <input id="title" className="form-input" placeholder="제목" {...register('title', { required: true })} />
    </div>
  );
}
