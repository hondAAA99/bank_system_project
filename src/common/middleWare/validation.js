export const validateMiddleWare = (Schema) => {
  return (req, res, next) => {
    const { error } = Schema.validate(
      {
        body: req.body,
        files: req.files,
        file: req.file,
        query: req.query,
        params: req.params,
        headers: req.headers,
      },
      {
        abortEarly: false,
        allowUnknown: true,
      },
    );

    const array_of_errors = [];
    if (error)
      error.details.forEach((err) => {
        array_of_errors.push({
          message: err.message,
          path: err.path,
        });
      });

    if (array_of_errors.length > 0) {
      return res.status(401).json({ ...array_of_errors });
    }

    next();
  };
};
