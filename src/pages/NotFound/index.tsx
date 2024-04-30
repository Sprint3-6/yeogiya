import './style.scss';

export default function NotFound() {
  return (
    <main className="not-found-wrapper">
      <img src="/assets/logos/logo-notFound.svg" alt="로고" className="not-found-logo" />
      <div className="not-found-text-container">
        <div className="not-found-error-text">404 Not Found</div>
        <div className="not-found-error-text-content">요청하신 페이지를 찾을 수 없습니다.</div>
      </div>
    </main>
  );
}
