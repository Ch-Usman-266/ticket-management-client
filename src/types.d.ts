interface LocalStorageUserProps {
  userId: string;
  name: string;
  email: string;
  role: Role;
  token: string;
}

interface TicketStatusProps {
  status: TicketStatus;
}

interface TicketCreatorProps {
  name: string;
  email: string;
}

enum ApiStatus {
  Success = 'success',
  Error = 'error',
}

enum TicketStatus {
  New = 'new',
  InProgress = 'in_progress',
  Resolved = 'resolved',
}
