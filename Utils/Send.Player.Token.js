const sendPlayerToken = (player, statusCode, res) => {
  const token = player.getJWTToken();

  // Options for Cookie
  const option = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("PlayerToken", token, option).json({
    succes: true,
    player,
    token,
  });
};

module.exports = sendPlayerToken;
