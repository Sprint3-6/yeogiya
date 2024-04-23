import { useParams } from 'react-router-dom';
import { useModal } from '../../hooks/useModal/useModal';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/constants/url';
import { myInfo } from '../../redux/myInfoSlice';
import instance from '../../api/instance/defaultInstance';

import Temp from '../../components/temp';

import './style.scss';

export default function ActivityDetails() {
  const { id } = useParams();
  const { Modal, openModal, closeModal } = useModal();
  const userInfo = useSelector(myInfo);

  const viewActivityDetail = async () => {
    const detail = await instance.get(`${BASE_URL}activities/718`);
    console.log(detail.data);
  };
  const viewMyActivity = async () => {
    const myList = await instance.get(`${BASE_URL}my-activities?size=20`);
    console.log(myList.data);
  };
  console.log(userInfo);

  return (
    <>
      <main className="activity-detail-container">
        {id}번 체험상세 페이지 입니다.
        <br />
        <button onClick={() => openModal('a')}>모달</button>
        <br />
        <button onClick={viewMyActivity}>내 체험 조회</button>
        <br />
        <button onClick={viewActivityDetail}>체험 상세 조회</button>
      </main>
      <Modal name="a">
        <Temp closeModal={closeModal} />
      </Modal>
    </>
  );
}
