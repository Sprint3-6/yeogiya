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
      navigate('/');
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
        <h1>정말 삭제하시겠습니까?</h1>
        <p>
          '{title}'에 대한 모든 데이터가 <span>사라집니다.</span>
        </p>
      </div>
      <div>
        <Button className="delete-modal-button" onClick={handleDeleteSpace}>
          삭제
        </Button>
        <Button className="delete-modal-button" onClick={closeModal}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
