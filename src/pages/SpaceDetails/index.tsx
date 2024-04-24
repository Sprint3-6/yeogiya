import { useParams } from 'react-router-dom';
import { useModal } from '../../hooks/useModal/useModal';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/constants/url';
import { myInfo } from '../../redux/myInfoSlice';
import instance from '../../api/instance/defaultInstance';

import Temp from '../../components/temp';

import './style.scss';

export default function SpaceDetails() {
  const { id } = useParams();
  const { Modal, openModal, closeModal } = useModal();
  const userInfo = useSelector(myInfo);

  const viewSpaceDetail = async () => {
    const detail = await instance.get(`${BASE_URL}activities/718`);
    console.log(detail.data);
  };
  const viewMySpace = async () => {
    const myList = await instance.get(`${BASE_URL}my-activities?size=20`);
    console.log(myList.data);
  };
  console.log(userInfo);

  return (
    <>
      <main className="space-detail-container">
        {id}번 공간상세 페이지 입니다.
        <br />
        <button onClick={() => openModal('a')}>모달</button>
        <br />
        <button onClick={viewMySpace}>내 공간 조회</button>
        <br />
        <button onClick={viewSpaceDetail}>공간 상세 조회</button>
      </main>
      <Modal name="a">
        <Temp closeModal={closeModal} />
      </Modal>
    </>
  );
}
