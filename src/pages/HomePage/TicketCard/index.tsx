import React from 'react';
import TicketStatusPill from '../TicketStatusPill';
import CreatorInfo from '../CreatorInfo';
import TicketActionButtons from '../TicketActionButtons';

interface TicketCardProps {
  id: string;
  name: string;
  description: string;
  email: string;
  status: TicketStatus;
  creator: TicketCreatorProps;
}

const TicketCard = ({
  id,
  name,
  description,
  email,
  creator,
  status,
}: TicketCardProps): JSX.Element => {
  return (
    <>
      <div className="rounded bg-white overflow-hidden shadow-2xl">
        <div className="flex justify-end px-2 py-2">
          <span className="text-xs rounded-full w-2/3 bg-violet-500 px-2 py-2 text-white shadow-md font-semibold">{`Assigned to: ${email}`}</span>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 break-words">{name}</div>
          <div className="text-gray-700 text-base break-words">
            {description}
          </div>
        </div>
        <TicketStatusPill status={status} />
        <CreatorInfo name={creator?.name} email={creator?.email} />
        <TicketActionButtons id={id} status={status} />
      </div>
    </>
  );
};

export default TicketCard;
