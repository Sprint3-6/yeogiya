import { DropDown, DropdownItem } from '@/components/Dropdown';

//TODO 체험완료 문구 변경

export default function MyReservation() {
  return (
    <>
      <h1>예약 내역</h1>
      <DropDown id="my-reservation-list" title="예약 상태">
        <DropdownItem value="all">전체</DropdownItem>
        <DropdownItem value="reservation-pending">예약 신청</DropdownItem>
        <DropdownItem value="reservation-canceled">예약 취소</DropdownItem>
        <DropdownItem value="reservation-confirmed">예약 승인</DropdownItem>
        <DropdownItem value="reservation-declined">예약 거절</DropdownItem>
        <DropdownItem value="reservation-completed">방문 완료</DropdownItem>
      </DropDown>
    </>
  );
}
