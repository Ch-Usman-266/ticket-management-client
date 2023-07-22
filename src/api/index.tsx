import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosRequestHeaders,
} from 'axios';
import getUserFromLocalStorage from '../utils/getUserFromLocalStorage';

const setBearerToken = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const user = getUserFromLocalStorage();
  if (user && user.token) {
    config.headers = Object.assign({}, config.headers, {
      Authorization: `Bearer ${user.token}`,
    }) as AxiosRequestHeaders;
  }
  return config;
};

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

instance.interceptors.request.use(setBearerToken);

const register = async (
  data: RegistrationParams,
): Promise<AxiosResponse<RegisterApiResponse>> => {
  return await instance.post<RegisterApiResponse>('/auth/register', data);
};

const login = async (
  data: LoginParams,
): Promise<AxiosResponse<LoginApiResponse>> => {
  return await instance.post<LoginApiResponse>('/auth/signin', data);
};

const getAllTickets = async (): Promise<AxiosResponse<TicketsApiResponse>> => {
  return await instance.get<TicketsApiResponse>('/tickets');
};

const getTicketById = async ({
  id,
}: {
  id: string;
}): Promise<AxiosResponse<TicketApiResponse>> => {
  return await instance.get<TicketApiResponse>(`/ticket/${id}`);
};

const createTicket = async (
  data: CreateTicketParams,
): Promise<AxiosResponse<CreateOrUpdateTicketApiResponse>> => {
  return await instance.post<CreateOrUpdateTicketApiResponse>('/tickets', data);
};

const updateTicketStatus = async ({
  id,
  status,
}: UpdateTicketStatusParams): Promise<
  AxiosResponse<CreateOrUpdateTicketApiResponse>
> => {
  return await instance.patch<CreateOrUpdateTicketApiResponse>(
    `/tickets/${id}/status`,
    {
      status,
    },
  );
};

export {
  register,
  login,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  createTicket,
};
