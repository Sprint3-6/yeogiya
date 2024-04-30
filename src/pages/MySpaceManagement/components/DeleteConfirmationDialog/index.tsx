import Button from '@/components/Button';
import './style.scss';

interface DeleteConfirmationDialogProps {
  closeModal: () => void;
}

export default function DeleteConfirmationDialog({ closeModal }: DeleteConfirmationDialogProps) {
  return (
    <div className="delete-dialog-box">
      <span>정말 삭제 하시겠습니까?</span>
      <div className="button-box">
        <Button className="cancel-button" onClick={closeModal}>
          취소하기
        </Button>
        <Button className="delete-button" onClick={() => {}}>
          삭제하기
        </Button>
      </div>
    </div>
  );
}
