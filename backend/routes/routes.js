module.exports = (app) => {
  const upload = app.middlewares.upload;
  const convertController = app.controllers.converterController;

  const uploadMiddleware = (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).send("Erro no upload do arquivo.");
      }
      next();
    });
  };

  const convertHandler = async (req, res) => {
    await convertController.convertFile(req, res);
  };

  app.post("/convert", uploadMiddleware, convertHandler);
};
