import React from 'react';
import PlayCircleIcon from '../../../svg/playCircleIcon';
import CheckMarkIcon from '../../../svg/checkmarkIcon';
import getUserFromLocalStorage from '../../../utils/getUserFromLocalStorage';
import { useNotificationContext } from '../../../context/notificationContext';
import { updateTicketStatus } from '../../../api';

enum TicketStatus {
  New = 'new',
  InProgress = 'in_progress',
  Resolved = 'resolved',
}

interface TicketActionButtonProps {
  id: string;
  status: TicketStatus;
}

const TicketActionButtons: React.FC<TicketActionButtonProps> = ({
  id,
  status,
}): JSX.Element => {
  const user = getUserFromLocalStorage();
  const isStatusNew = status === 'new';
  const isStatusInProgress = status === 'in_progress';
  const isStatusDone = status === 'resolved';
  const isAdminUser = user?.role === 'admin';
  const { addNotification } = useNotificationContext();

  const handleStatusUpdate = (newStatus: TicketStatus): void => {
    try {
      if (isAdminUser) {
        if (newStatus === 'in_progress' || newStatus === 'resolved') {
          updateTicketStatus({ id, status: newStatus })
            .then((response) => {
              addNotification('success', response.data.message);
              window.location.reload();
            })
            .catch((error) => {
              addNotification('error', 'Failed to update the ticket!');
              console.log('Failed to update the ticket status:', error);
            });
        }
      } else {
        addNotification(
          'error',
          'Access denied: You are not allowed to update the ticket status',
        );
      }
    } catch (error) {
      console.log('Error occurred:', error);
      addNotification('error', 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-end mx-5 my-5">
      {isAdminUser && !isStatusDone && (
        <>
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${
              isStatusNew ? 'bg-amber-500' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isStatusNew}
            onClick={() => {
              handleStatusUpdate(TicketStatus.InProgress);
            }}
          >
            Mark as in Progress
            <PlayCircleIcon className="pl-5 h-6" />
          </button>
          <button
            className={`inline-flex items-center ml-2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${
              isStatusInProgress
                ? 'bg-green-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isStatusInProgress}
            onClick={() => {
              handleStatusUpdate(TicketStatus.Resolved);
            }}
          >
            Mark as Complete
            <CheckMarkIcon className="pl-5 h-6" />
          </button>
        </>
      )}
      {isStatusDone && (
        <div className="ml-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg">
          Completed
        </div>
      )}
    </div>
  );
};

export default TicketActionButtons;
