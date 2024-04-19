import './style.scss';

export default function Loading() {
  return (
    <main className="loading-wrapper">
      <img src="/public/assets/logos/logo-icon.svg" alt="로고" className="loading-logo" />
      <img src="/public/assets/icons/icon-loading.svg" alt="로딩 중" className="loading-spinner" />
      <div className="loading-text-container">
        <div className="loading-text">로딩 중입니다.</div>
        <div className="loading-wait-text">잠시만 기다려주세요.</div>
      </div>
    </main>
  );
}
