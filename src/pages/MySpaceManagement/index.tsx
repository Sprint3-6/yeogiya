import MyActivityHeader from './components/MyActivityHeader';
import './ActivityManagement.scss';
import MyActivityList from './components/MyActivityList';

export default function ActivityManagement() {
  return (
    <main className="activity-management">
      <MyActivityHeader />
      <MyActivityList />
    </main>
  );
}
