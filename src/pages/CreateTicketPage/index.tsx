import React from 'react';
import TicketIcon from '../../svg/ticketIcon';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../../api';
import getUserFromLocalStorage from '../../utils/getUserFromLocalStorage';
import { useNotificationContext } from '../../context/notificationContext';
import * as Yup from 'yup';

type SetSubmittingFunction = (value: boolean) => void;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const initalValues = { name: '', description: '', email: '' };

const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotificationContext();

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: SetSubmittingFunction },
  ): Promise<void> => {
    try {
      const user = getUserFromLocalStorage();

      const response = await createTicket({
        ...values,
        creatorId: user?.userId,
      });

      if (response.status === 201) {
        setSubmitting(false);
        addNotification('success', response.data.message);
        navigate('/');
      } else {
        addNotification('error', response.data.message);
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      addNotification('error', 'Something went wrong!');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 overflow-auto">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <a
          href="/create-ticket"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <TicketIcon className="w-8 h-8 mr-2" />
          Create Ticket
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              New Ticket
            </h1>
            <Formik
              initialValues={initalValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Title of the ticket"
                      required
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <Field
                      type="textarea"
                      name="description"
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Assign to
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="johndoe@gmail.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-center py-3 rounded bg-green-600 text-white hover:dark:bg-green-900 focus:outline-none my-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Create ticket'}
                  </button>
                  <p className="text-sm font-light dark:text-gray-400">
                    Want to go to dashboard?
                    <a
                      href="/"
                      className="font-medium text-white hover:underline ml-1"
                    >
                      Click here
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketPage;
