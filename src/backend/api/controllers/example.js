module.exports = {
  example: (req, res) => {
    res.json({
      success: true,
      status: 200,
      message: 'Example endpoint response',
      data: {},
    });
  },
};
