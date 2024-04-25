import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './useModal.scss';
import { ModalProps } from './types';

export const useModal = () => {
  // 모달의 열림/닫힘 상태를 관리하는 state
  const [modalName, setModalName] = useState('');

  // 모달 안과 밖을 구분하게 해주는 ref
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달을 열기 위한 함수
  const openModal = (name: string) => {
    setModalName(name);
    document.addEventListener('mousedown', handleClickOutside);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setModalName('');
    document.removeEventListener('mousedown', handleClickOutside);
  };

  // 모달 밖을 클릭시 닫히게 하는 함수
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  // index.html에 root div 형제인 id가 modal인 div를 참조
  // createPortal을 이용하여 z-index 쌓임맥락으로 인한 예상치 못한 레이아웃 문제 해결
  const modalRoot = document.body as HTMLElement;

  // 기본 스타일을 인라인 스타일로 고정
  const Modal = ({ name, children }: ModalProps) => {
    return ReactDOM.createPortal(
      <>
        {name === modalName && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                animation: 'slideIn 0.3s ease forwards',
              }}
              ref={modalRef}
            >
              {children}
            </div>
          </div>
        )}
      </>,
      modalRoot,
    );
  };

  // 상태 및 제어 함수를 포함하는 객체 반환
  return { Modal, openModal, closeModal };
};
