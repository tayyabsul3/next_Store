const sendToken = async (user, statusCode, res) => {
  const token = await user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httponly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    sucess: true,
    user,
    token,
  });
};

module.exports = sendToken;
