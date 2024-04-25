import { PriceInputProps } from '../../types';

export default function PriceInput({ register }: PriceInputProps) {
  return (
    <div className="input-box">
      <label htmlFor="price">가격</label>
      <input
        id="price"
        className="form-input"
        placeholder="가격"
        type="number"
        {...register('price', { required: true })}
      />
    </div>
  );
}
