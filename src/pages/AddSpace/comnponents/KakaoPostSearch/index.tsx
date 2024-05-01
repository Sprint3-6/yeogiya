import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { KakaoPostSearchProps } from '../../types';

export default function KakaoPostSearch({ register, setValue, error, getValues }: KakaoPostSearchProps) {
  const open = useDaumPostcodePopup();
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setValue('address', fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="input-box">
      <label>주소</label>
      <div className={`post-search-box ${error && !getValues('address') ? 'error' : ''}`}>
        <input
          className="form-input"
          disabled
          placeholder="주소를 검색해주세요"
          {...register('address', { required: true })}
        />
        <button className="post-search-button button-black" type="button" onClick={handleClick}>
          주소검색
        </button>
      </div>
    </div>
  );
}
