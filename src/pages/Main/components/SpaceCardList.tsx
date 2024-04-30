import SpaceCard from './SpaceCard';
import { Spaces } from '../types/spaces-type';
import './spaceCardList.scss';

interface SpaceCardListProps {
  spaces: Spaces[];
}

export default function SpaceCardList({ spaces }: SpaceCardListProps) {
  return (
    <div className="space-card-list-container">
      {spaces.map((space) => (
        <SpaceCard key={space.id} item={space} />
      ))}
    </div>
  );
}
