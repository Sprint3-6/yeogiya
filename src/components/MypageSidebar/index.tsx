import './style.scss';
import { MyPageSideList } from './components/MypageSideList';

export default function MypageSidebar() {
  const MYPAGE_BASIC_URL = 'mypage';
  const MYPAGE_BASIC_ICON = '/assets/icons';

  const mypageLink = MYPAGE_BASIC_URL;
  const mypageIcon = `${MYPAGE_BASIC_ICON}/icon-myinfo.svg`;

  const reservationLink = `${MYPAGE_BASIC_URL}/reservation`;
  const reservationIcon = `${MYPAGE_BASIC_ICON}/icon-list.svg`;

  const myspageAdminLink = `${MYPAGE_BASIC_URL}/admin`;
  const myspageAdminIcon = `${MYPAGE_BASIC_ICON}/icon-setting.svg`;

  const myspageAddLink = `${MYPAGE_BASIC_URL}/admin/add`;
  const myspageAddIcon = `${MYPAGE_BASIC_ICON}/icon-setting.svg`;

  const reservationStatusLink = `${MYPAGE_BASIC_URL}/admin/status`;
  const reservationStatusIcon = `${MYPAGE_BASIC_ICON}/icon-relstatus.svg`;

  return (
    <div className="mypage-side-container">
      <div className="mypage-side-profile-container">
        <div className="mypage-side-profile">
          <div className="side-profile">
            <img src="/assets/images/profile-image.svg" alt="프로필" />
            <div className="side-icon">
              <img src="/assets/icons/icon-pen.svg" />
            </div>
          </div>
        </div>
      </div>

      <div className="mapage-side-list">
        <MyPageSideList text={'내정보'} image={mypageIcon} link={mypageLink} />
        <MyPageSideList text={'예약 내역'} image={reservationIcon} link={reservationLink} />
        <MyPageSideList text={'내 공간 관리'} image={myspageAdminIcon} link={myspageAdminLink} />
        <MyPageSideList text={'내 공간 등록'} image={myspageAddIcon} link={myspageAddLink} />
        <MyPageSideList text={'예약 현황'} image={reservationStatusIcon} link={reservationStatusLink} />
      </div>
    </div>
  );
}
