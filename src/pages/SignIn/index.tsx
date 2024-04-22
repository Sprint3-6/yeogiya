import { DropDown, DropdownItem } from '../../components/DropDown';

export default function SignIn() {
  return (
    <main>
      로그인 페이지 입니다.
      <DropDown title={'가격'} arrowUp="🔺" arrowDown="🔻">
        <DropdownItem>낮은 순</DropdownItem>
        <DropdownItem>높은 순</DropdownItem>
      </DropDown>
      <DropDown title={'카테고리'} arrowUp="^" arrowDown="v">
        <DropdownItem>문화 예술</DropdownItem>
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
    </main>
  );
}
