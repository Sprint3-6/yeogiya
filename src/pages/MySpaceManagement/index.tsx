import './style.scss';
import MySpaceList from './components/MySpaceList';
import MySpaceHeader from './components/MySpaceHeader';

export default function MySpaceManagement() {
  return (
    <main>
      <div className="space-management">
        <MySpaceHeader />
        <MySpaceList />
      </div>
    </main>
  );
}
