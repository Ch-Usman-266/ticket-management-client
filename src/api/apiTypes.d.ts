enum Role {
  Admin = 'admin',
  User = 'user',
}

interface RegisterApiPayload {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface RegisterApiResponse {
  status: ApiStatus;
  message: string;
  payload: { token: string };
}

interface LoginApiResponse {
  status: ApiStatus;
  message: string;
  payload: { token: string };
}

interface RegistrationParams {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface LoginParams {
  email: string;
  password: string;
}

interface Ticket {
  id: string;
  name: string;
  email: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator: {
    name: string;
    email: string;
  };
}

interface TicketsApiResponse {
  status: ApiStatus;
  message: string;
  payload: Ticket[];
}

interface TicketApiResponse {
  status: ApiStatus;
  message: string;
  payload: Ticket;
}

interface CreateTicketParams {
  name: string;
  email: string;
  description: string;
  creatorId: string;
}

interface CreateOrUpdateTicketApiResponse {
  status: ApiStatus;
  message: string;
  payload: {
    id: string;
    status: TicketStatus;
    name: string;
    email: string;
    description: string;
    creatorId: string;
  };
}

interface UpdateTicketStatusParams {
  id: string;
  status: TicketStatus;
}
