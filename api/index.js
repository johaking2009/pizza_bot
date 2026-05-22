module.exports = (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Pizza Bot API is running",
    webhook: "/api/webhook",
  });
};
