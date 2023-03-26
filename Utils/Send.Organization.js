const sendOrgToken = (Org, statusCode, res) => {
  const token = Org.getJWTToken();
  console.log(token);

  // Options for Cookie
  const option = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("Org", token, option).json({
    succes: true,
    Org,
    token,
  });
};

module.exports = sendOrgToken;
