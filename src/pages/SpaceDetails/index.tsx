import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useModal } from '../../hooks/useModal/useModal';
import { useAppSelector } from '@/redux/store/store';
import { DetailType } from './Types/DetailType';
import getSpaceDetail from '@/api/getSpaceDetail';
import categoryFilter from '@/utils/categoryFilter';
// import Temp from '../../components/temp';
import './style.scss';
import KakaoMap from '@/components/KakaoMap';

export default function SpaceDetails() {
  const { id } = useParams();
  // const { Modal, openModal, closeModal } = useModal();
  const [detail, SetDetail] = useState<DetailType>();

  const userInfo = useAppSelector((state) => state.myInfo);

  console.log(userInfo);

  const setSpaceDetail = async () => {
    const detailData = await getSpaceDetail(id);
    SetDetail(detailData);
  };

  useEffect(() => {
    setSpaceDetail();
  }, [detail?.userId]);

  return (
    <div className="space-detail-wrapper">
      <section className="space-detail-container">
        <div className="space-detail-container-header">
          <h3>{categoryFilter(detail?.category)}</h3>
          <h1>{detail?.title}</h1>
          <div>
            <img src="/public/assets/icons/icon-star.svg" />
            <h2>{`${detail?.rating} (${detail?.reviewCount})`}</h2>
            <img src="/favicon.svg" />
            <h3>{detail?.address}</h3>
          </div>
          {detail?.userId === userInfo.id && (
            <img src="/public/assets/icons/icon-meatball.svg" className="space-detail-kebab" />
          )}
        </div>

        <figure className="space-detail-container-pictures">
          <div>
            <img src={detail?.bannerImageUrl} />
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={detail?.subImages[index] ? '' : 'empty-image'}>
              {
                <img
                  src={
                    detail?.subImages[index] ? detail.subImages[index].imageUrl : '/public/assets/logos/logo-icon.svg'
                  }
                />
              }
            </div>
          ))}
        </figure>

        <section className="space-detail-container-description">
          <h2>공간 설명</h2>
          <p>{detail?.description}</p>
        </section>

        <KakaoMap />
        <br />
        {/* <button onClick={() => openModal('a')}>모달</button> */}
      </section>

      {/* <Modal name="a">
        <Temp closeModal={closeModal} />
      </Modal> */}
    </div>
  );
}
