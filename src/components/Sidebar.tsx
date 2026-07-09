import type { CategoryFilter, Prompt, TeamFilter } from '@/types';
import { CATEGORIES, TEAMS } from '@/data/constants';

interface SidebarProps {
  prompts: Prompt[];
  activeTeam: TeamFilter;
  activeCat: CategoryFilter;
  onTeamChange: (t: TeamFilter) => void;
  onCatChange: (c: CategoryFilter) => void;
}

export function Sidebar({
  prompts,
  activeTeam,
  activeCat,
  onTeamChange,
  onCatChange,
}: SidebarProps) {
  const teamCount = (t: TeamFilter) =>
    t === 'all' ? prompts.length : prompts.filter((p) => p.team === t).length;
  const catCount = (c: CategoryFilter) =>
    c === 'all' ? prompts.length : prompts.filter((p) => p.category === c).length;

  return (
    <nav className="rail">
      <div className="rail-section">
        <div className="rail-label">Kênh</div>
        <RailItem
          label="Tất cả"
          count={teamCount('all')}
          active={activeTeam === 'all'}
          onClick={() => onTeamChange('all')}
        />
        {TEAMS.map((t) => (
          <RailItem
            key={t}
            label={t}
            count={teamCount(t)}
            active={activeTeam === t}
            onClick={() => onTeamChange(t)}
          />
        ))}
      </div>

      <div className="rail-section">
        <div className="rail-label">Loại nội dung</div>
        <RailItem
          label="Tất cả"
          count={catCount('all')}
          active={activeCat === 'all'}
          onClick={() => onCatChange('all')}
        />
        {CATEGORIES.map((c) => (
          <RailItem
            key={c}
            label={c}
            count={catCount(c)}
            active={activeCat === c}
            onClick={() => onCatChange(c)}
          />
        ))}
      </div>
    </nav>
  );
}

interface RailItemProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

function RailItem({ label, count, active, onClick }: RailItemProps) {
  return (
    <div className={`rail-item${active ? ' active' : ''}`} onClick={onClick}>
      {label} <span className="rail-count">{count}</span>
    </div>
  );
}
