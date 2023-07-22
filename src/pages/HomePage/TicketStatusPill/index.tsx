import React from 'react';

const color = {
  new: 'bg-sky-600',
  in_progress: 'bg-yellow-600',
  resolved: 'bg-green-600',
};

const TicketStatusPill: React.FC<TicketStatusProps> = ({
  status,
}): JSX.Element => {
  const colorClassName = `inline-block text-white ${color[status]} rounded-full px-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`;

  return (
    <div className="px-4 pt-2 pb-2">
      <span className={colorClassName}>{status}</span>
    </div>
  );
};

export default TicketStatusPill;
