const responseMiddleware = (req, res) => {
  if (res.err) {
    const status = res.err.message.includes("not found")
      ? 404
      : 400;

    return res.status(status).json({
      error: true,
      message: res.err.message
    });
  }

  return res.status(200).json(res.data);
};

export { responseMiddleware };
