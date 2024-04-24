import { DropDown, DropdownItem } from '../../components/DropDown';
import './style.scss';

export default function SignIn() {
  // const handleTest1 = () => {
  //   console.log('낮은 순 선택하면 이 함수 실행');
  // };
  // const handleTest2 = () => {
  //   console.log('높은 순 선택하면 이 함수 실행');
  // };

  const onClickItem = (e: string) => {
    console.log('클릭한 것', e);
  };

  const dropdownItem1: DropdownItem[] = [
    { value: 'row', itemname: '낮은 순' },
    { value: 'high', itemname: '높은 순' },
    { value: 'popular', itemname: '인기 순' },
    { value: 'sale', itemname: '판매 순' },
  ];

  const dropdownItem2: DropdownItem[] = [
    { value: 'edit', itemname: '수정하기' },
    { value: 'delete', itemname: '삭제하기' },
  ];

  const imageUrl =
    'https://today-trip.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-logo.8104e90e.png&w=350&q=75';

  return (
    <main>
      로그인 페이지 입니다.
      <div className="price">
        <DropDown
          image={imageUrl}
          title={'가격'}
          arrowUp="🔺"
          arrowDown="🔻"
          items={dropdownItem1}
          onClickItem={onClickItem}
        />
      </div>
      <div className="priceee">
        <DropDown title={'가격'} arrowUp="🔺" arrowDown="🔻" items={dropdownItem1} onClickItem={onClickItem} />
      </div>
      <DropDown arrowUp=":" arrowDown=":" items={dropdownItem2} onClickItem={onClickItem} />
      그림
    </main>
  );
}

{
  /* 드롭다운에서 하위 벨류랑 온체인지 갖고있기 상위에서 관리하기 드롭다운 트리거를 하위에 넣어서 */
}
{
  /* 키랑 벨류만 갖고 있어야함 */
}
/*
 <DropDown title={'가격'} arrowUp="🔺" arrowDown="🔻" item={dropdownItem}>
     
        <DropdownItem value="popu">인기 순</DropdownItem>
        <DropdownItem value="row">낮은 순</DropdownItem>

        <DropdownItem value="high">높은 순</DropdownItem>
      </DropDown>
      <DropDown array={dropdownItem}>그림</DropDown>
      <DropDown title={'카테고리'} arrowUp="^" arrowDown="v">
        <DropdownItem value="1">문화 예술</DropdownItem>
        <DropdownItem>식음료</DropdownItem>
        <DropdownItem>스포츠</DropdownItem>
        <DropdownItem>투어</DropdownItem>
        <DropdownItem>관광</DropdownItem>
        <DropdownItem>웰빙</DropdownItem>
      </DropDown>
      <DropDown arrowUp=":" arrowDown=":">
        <DropdownItem>수정하기</DropdownItem>
        <DropdownItem>삭제하기</DropdownItem>
      </DropDown>
      <DropDown title="그림">
        <DropdownItem>내정보</DropdownItem>
        <DropdownItem>예약하기</DropdownItem>
        <DropdownItem>내정보</DropdownItem>
        <DropdownItem>예약하기</DropdownItem>
      </DropDown>
      <DropDown title="그림">
        <DropdownItem>00:00</DropdownItem>
        <DropdownItem>00:00</DropdownItem>
        <DropdownItem>00:00</DropdownItem>
        <DropdownItem>00:00</DropdownItem>
        <DropdownItem>00:00</DropdownItem>
        <DropdownItem>00:00</DropdownItem>
        <DropdownItem>00:00</DropdownItem>
        <DropdownItem>00:00</DropdownItem>
      </DropDown>

*/
