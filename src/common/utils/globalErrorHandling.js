export const globalErrorHandling = (err, req, res, next) => {
  const status = err.cause || 500;
  res.status(status).json({
    status,
    err: err.message,
    stack: err.stack,
  });
};
export const ErrorUnAuthorizedRequest = (
  message = "you are not authorized to access this page",
) => {
  throw new Error(message, { cause: 401 });
};
export const Errorforbidden = (
  message = "forbidden response due to error when proccessing the request data",
) => {
  throw new Error(message, { cause: 403 });
};
export const ErrorNotFound = (message = "failed to find the data") => {
  throw new Error(message, { cause: 404 });
};
export const ErrorConflict = (message = "conflict") => {
  throw new Error(message, { cause: 409 });
};
export const ErrorInteralServerError = (message, statusCode = 500) => {
  throw new Error(message, { statusCode });
};
export const SuccessResponse = ({ res, statusCode = 200, data }) => {
  return res.status(statusCode).json(data);
};
