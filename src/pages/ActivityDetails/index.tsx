import { useParams } from 'react-router-dom';
import { useModal } from '../../components/modal/useModal';
import { BASE_URL } from '../../api/constants/url';

import instance from '../../api/instance/defaultInstance';
import toast from '../../utils/toast';
import Temp from '../../components/temp';

import './style.scss';

export default function ActivityDetails() {
  const { id } = useParams();
  const { Modal, openModal, closeModal } = useModal();

  const viewActivityDetail = async () => {
    const myList = await instance.get(`${BASE_URL}activities/718`);
    console.log(myList.data);
  };
  const viewMyActivity = async () => {
    const myList = await instance.get(`${BASE_URL}my-activities?size=20`);
    console.log(myList.data);
  };

  return (
    <>
      <main className="activityDetailContainer">
        {id}번 체험상세 페이지 입니다.
        <br />
        <button onClick={() => toast.success('성공 토스트 입니다.')}>성공토스트</button>
        <br />
        <button onClick={() => toast.warning('경고 토스트 입니다.')}>경고토스트</button>
        <br />
        <button onClick={() => toast.error('에러 토스트 입니다.')}>에러토스트</button>
        <br />
        <button onClick={() => openModal('a')}>모달</button>
        <br />
        <button onClick={viewMyActivity}>내 체험 조회</button>
        <button onClick={viewActivityDetail}>체험 상세 조회</button>
      </main>
      <Modal type="a">
        <Temp closeModal={closeModal} />
      </Modal>
    </>
  );
}
