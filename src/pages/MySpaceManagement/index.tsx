import './MySpaceManagement.scss';
import MyActivityHeader from './components/MyActivityHeader';
import MyActivityList from './components/MyActivityList';

export default function MySpaceManagement() {
  return (
    <main className="activity-management">
      <MyActivityHeader />
      <MyActivityList />
    </main>
  );
}
