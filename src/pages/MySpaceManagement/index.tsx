import './style.scss';
import MySpaceList from './components/MySpaceList';
import MySpaceHeader from './components/MySpaceHeader';

export default function MySpaceManagement() {
  return (
    <main>
      <div className="my-space-container">
        <MySpaceHeader />
        <MySpaceList />
      </div>
    </main>
  );
}
