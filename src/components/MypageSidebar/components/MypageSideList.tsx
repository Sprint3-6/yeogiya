// import { MyPageSideListItem } from './MypageSideListItem';
import '../style.scss';
import { MypageSideListItem } from './MypageSideListItem';

export default function MypageSideList() {
  const MYPAGE_BASIC_URL = 'mypage';
  const MYPAGE_BASIC_ICON = '/assets/icons';

  // 내 정보
  const mypageLink = MYPAGE_BASIC_URL;
  const mypageIcon = `${MYPAGE_BASIC_ICON}/icon-myinfo.svg`;
  const mypageIconHover = `${MYPAGE_BASIC_ICON}/icon-myinfo-hover.svg`;

  // 예약 내역
  const reservationLink = `${MYPAGE_BASIC_URL}/reservation`;
  const reservationIcon = `${MYPAGE_BASIC_ICON}/icon-list.svg`;
  const reservationIconHover = `${MYPAGE_BASIC_ICON}/icon-list-hover.svg`;

  // 내 공간 관리
  const myspageAdminLink = `${MYPAGE_BASIC_URL}/admin`;
  const myspageAdminIcon = `${MYPAGE_BASIC_ICON}/icon-setting.svg`;
  const myspageAdminIconHover = `${MYPAGE_BASIC_ICON}/icon-setting-hover.svg`;

  // 내 공간 등록
  const myspageAddLink = `${MYPAGE_BASIC_URL}/admin/add`;
  const myspageAddIcon = `${MYPAGE_BASIC_ICON}/icon-add.png`;
  const myspageAddIconHover = `${MYPAGE_BASIC_ICON}/icon-add-hover.png`;

  // 예약 현황
  const reservationStatusLink = `${MYPAGE_BASIC_URL}/admin/status`;
  const reservationStatusIcon = `${MYPAGE_BASIC_ICON}/icon-relstatus.svg`;
  const reservationStatusIconHover = `${MYPAGE_BASIC_ICON}/icon-relstatus-hover.svg`;

  return (
    <div className="mapage-side-list">
      <MypageSideListItem text={'내정보'} link={mypageLink} image={mypageIcon} clickImage={mypageIconHover} />
      <div className="mypage-side-line">
        <hr></hr>
        GUEST
      </div>
      <MypageSideListItem
        text={'예약 내역'}
        link={reservationLink}
        image={reservationIcon}
        clickImage={reservationIconHover}
      />
      <div className="mypage-side-line">
        <hr></hr>
        HOST
      </div>
      <MypageSideListItem
        text={'예약 현황'}
        link={reservationStatusLink}
        image={reservationStatusIcon}
        clickImage={reservationStatusIconHover}
      />
      <MypageSideListItem
        text={'내 공간 등록'}
        link={myspageAddLink}
        image={myspageAddIcon}
        clickImage={myspageAddIconHover}
      />
      <MypageSideListItem
        text={'내 공간 관리'}
        link={myspageAdminLink}
        image={myspageAdminIcon}
        clickImage={myspageAdminIconHover}
      />
    </div>
  );
}
