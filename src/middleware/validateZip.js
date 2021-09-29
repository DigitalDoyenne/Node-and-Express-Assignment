const validateZip = (req, _res, next) => {
  const zip = req.params.zip;
  if (zip !== "all" && (zip.length !== 5 || typeof zip !== "number")) {
    next(`Zip (${zip}) is invalid!`);
  } else {
  next()
  };
};

module.exports = validateZip;
