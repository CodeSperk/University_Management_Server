import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]+)"/);
  const extractedMessage = match && match[1];

  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  return {
    statusCode,
    message: 'Duplicate ID',
    errorSources: errorSources,
  };
};

export default handleDuplicateError;
