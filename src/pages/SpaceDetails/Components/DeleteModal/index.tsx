import { useNavigate } from 'react-router-dom';
import deleteMySpace from '@/api/deleteMySpace';
import Button from '@/components/Button';
import './style.scss';
import toast from '@/utils/toast';
import { ErrorType } from '@/api/types/axiosErrorType';
import { DeleteModalType } from '../../Types/DetailTypes';

const DeleteModal = ({ closeModal, title, id }: DeleteModalType) => {
  const navigate = useNavigate();

  const handleDeleteSpace = async () => {
    try {
      await deleteMySpace(id);
      toast.success('삭제되었습니다');
      setTimeout(() => {
        navigate('/mypage/admin');
        window.location.reload();
      }, 1000);
    } catch (err) {
      const error = err as ErrorType;
      toast.error(error.response.data.message);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="delete-modal">
      <div>
        <h3>정말 삭제하시겠습니까?</h3>
        <p>
          <span className="delete-modal-title">'{title}'</span>의 <br />
          모든 데이터가 <span className="delete-modal-special">사라집니다.</span>
        </p>
      </div>
      <div>
        <Button className="delete-modal-button button-special" onClick={handleDeleteSpace}>
          삭제
        </Button>
        <Button className="delete-modal-button button-white" onClick={closeModal}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
