import { useParams } from 'react-router-dom';
import { useModal } from '../../components/modal/useModal';
import instance from '../../api/instance/defaultInstance';
import { BASE_URL } from '../../api/constants/url';

import toast from '../../utils/toast';
import Temp from '../../components/temp';

import './style.scss';

export default function ActivityDetails() {
  const { id } = useParams();
  const { Modal, openModal, closeModal } = useModal();

  const login = async () => {
    const userInfo = await instance.post(`${BASE_URL}auth/login`, {
      email: 'jyp1@jyp.com',
      password: '12345678',
    });
    console.log(userInfo);
    localStorage.setItem('accessToken', userInfo.data.accessToken);
    localStorage.setItem('refreshToken', userInfo.data.refreshToken);
  };

  const viewList = async () => {
    const myList = await instance.get(`${BASE_URL}my-activities?size=20`);
    console.log(myList);
  };

  return (
    <>
      <main>
        {id}번 체험상세 페이지 입니다.
        <br />
        <button onClick={() => toast.success('성공 토스트 입니다.')}>성공토스트</button>
        <br />
        <button onClick={() => toast.warning('경고 토스트 입니다.')}>경고토스트</button>
        <br />
        <button onClick={() => toast.error('에러 토스트 입니다.')}>에러토스트</button>
        <button onClick={() => openModal('a')}>모달</button>
        <button onClick={viewList}>내 체험리스트 조회</button>
      </main>
      <button className="temp-login" onClick={login}>
        로그인
      </button>
      <Modal type="a">
        <Temp closeModal={closeModal} />
      </Modal>
    </>
  );
}
