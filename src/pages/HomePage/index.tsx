import React, { useEffect, useState } from 'react';
import TicketCard from './TicketCard';
import { getAllTickets } from '../../api';

interface Ticket {
  id: string;
  name: string;
  email: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator: {
    name: string;
    email: string;
  };
}

const HomePage = (): JSX.Element => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async (): Promise<void> => {
      try {
        const response = await getAllTickets();
        setTickets(response.data.payload);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets().catch((error) => {
      console.error('Error in useEffect:', error);
    });
  }, []);

  return (
    <div className="bg-zinc-200 h-full">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {tickets.map(({ id, name, email, description, status, creator }) => {
          return (
            <TicketCard
              key={id}
              id={id}
              name={name}
              email={email}
              description={description}
              status={status}
              creator={creator}
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/create-ticket">Create a New Ticket</a>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
