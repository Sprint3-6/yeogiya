import { Link, useNavigate } from 'react-router-dom';
import { MySpaceCardProps } from '../../types';
import './style.scss';
import { DropDown, DropdownItem } from '@/components/Dropdown';
import { useModal } from '@/hooks/useModal/useModal';
import DeleteModal from '@/pages/SpaceDetails/Components/DeleteModal';

export default function MySpaceCard({ activity }: MySpaceCardProps) {
  const navigate = useNavigate();
  const handleDropdown = (value: string) => {
    switch (value) {
      case 'delete':
        openModal('delete');
        break;
      case 'edit':
        navigate(`edit/${activity.id}`);
    }
  };
  const { Modal, openModal, closeModal } = useModal();
  const formattedPrice = activity.price.toLocaleString();
  return (
    <>
      <Link to={`/space/${activity.id}`}>
        <div className="my-space-card-box">
          <div className="my-space-card-img-box">
            <img className="my-space-card-img" src={activity.bannerImageUrl} alt="메인 사진" />
          </div>
          <div className="my-space-card-imf">
            <div>
              <div className="my-space-card-star-box">
                <img className="my-space-card-star" src="/assets/icons/icon-star.svg" alt="rating star" />
                <span>
                  {activity.rating}({activity.reviewCount})
                </span>
              </div>
              <h2 className="my-space-card-title">{activity.title}</h2>
            </div>
            <div className="my-space-card-price">
              <span>
                ￦{formattedPrice} <span className="price-person">/인</span>
              </span>
              <DropDown id="kabab" image="/assets/icons/icon-meatball.svg" onClickItem={handleDropdown}>
                <DropdownItem value="edit">수정하기</DropdownItem>
                <DropdownItem value="delete">삭제하기</DropdownItem>
              </DropDown>
            </div>
          </div>
        </div>
      </Link>
      <Modal name="delete">
        <DeleteModal closeModal={closeModal} title={activity.title} id={activity.id.toString()} />
      </Modal>
    </>
  );
}
