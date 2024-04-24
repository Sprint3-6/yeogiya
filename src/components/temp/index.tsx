import './style.scss';

type Type = {
  closeModal: () => void;
};

const Temp = ({ closeModal }: Type) => {
  return (
    <div className="temp-div">
      임시 컴포넌트 입니다
      <button onClick={closeModal}>모달 닫기</button>
    </div>
  );
};

export default Temp;
