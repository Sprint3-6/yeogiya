import './style.scss';
import MySpaceList from './components/MySpaceList';
import MySpaceHeader from './components/MySpaceHeader';

export default function MySpaceManagement() {
  return (
    <main className="space-management">
      <MySpaceHeader />
      <MySpaceList />
    </main>
  );
}
