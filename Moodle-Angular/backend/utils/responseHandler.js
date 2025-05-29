// logique pour message d'erreur et success de API
export const CreateError = (status , message , data = null) =>{

  const err = new Error();
  err.statusCode = status;
  err.message = message;
  err.data = data;
  return err;
};

export const CreateSuccess = (status, message, data = null) => {
  return {
    statusCode: status,
    message,
    data,
  };
};


