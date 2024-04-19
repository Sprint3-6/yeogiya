import './style.scss';

export default function NotFound() {
  return (
    <main className="notFoundWrapper">
      <img src="/public/assets/logos/logo-notFound.svg" alt="로고" className="notFoundLogo" />
      <div className="notFoundTextContainer">
        <div className="notFoundErrorText">404 Not Found</div>
        <div className="notFoundErrorTextContent">요청하신 페이지를 찾을 수 없습니다.</div>
      </div>
    </main>
  );
}
