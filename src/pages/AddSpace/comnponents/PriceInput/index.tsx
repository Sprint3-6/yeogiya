import { PriceInputProps } from '../../types';

export default function PriceInput({ register }: PriceInputProps) {
  const formatPrice = (value: string) => {
    // 숫자가 아닌 문자를 제거하고, 숫자만 남기기
    const numberValue = value.replace(/[^0-9]/g, '');
    // 숫자를 천 단위로 쉼표가 찍힌 문자열로 변환
    const formattedValue = Number(numberValue).toLocaleString();
    return formattedValue;
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력된 가격 값을 포맷팅하여 표시
    event.target.value = formatPrice(event.target.value);
  };
  return (
    <div className="input-box">
      <label htmlFor="price">가격</label>
      <input
        id="price"
        className="form-input"
        placeholder="가격"
        type="text"
        {...register('price', { required: true, onChange: handlePriceChange })}
      />
    </div>
  );
}
