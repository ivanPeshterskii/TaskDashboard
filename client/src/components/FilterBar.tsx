interface FilterBarProps {
  priorityFilter: string;
  search: string;
  onPriorityChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export default function FilterBar({
  priorityFilter,
  search,
  onPriorityChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={priorityFilter} onChange={(e) => onPriorityChange(e.target.value)}>
        <option value="">All priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}