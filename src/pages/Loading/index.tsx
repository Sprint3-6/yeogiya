import './style.scss';

export default function Loading() {
  return (
    <main className="loadingWrapper">
      <img src="/public/assets/logos/logo-icon.svg" alt="로고" className="loadingLogo" />
      <img src="/public/assets/icons/icon-loading.svg" alt="로딩 중" className="loadingSpinner" />
      <div className="loadingTextContainer">
        <div className="loadingText">로딩 중입니다.</div>
        <div className="loadingWaitText">잠시만 기다려주세요.</div>
      </div>
    </main>
  );
}
