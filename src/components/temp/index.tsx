import './style.scss';

// 모달 테스트용 임시 컴포넌트 입니다
// 추후에 삭제하도록 하겠습니다!

type Type = {
  closeModal: () => void;
};

const Temp = ({ closeModal }: Type) => {
  return (
    <div className="temp">
      임시 컴포넌트 입니다
      <button onClick={closeModal}>모달 닫기</button>
    </div>
  );
};

export default Temp;
