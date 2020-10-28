module.exports = {
  test: function(req, res) {
    res.json({
      success: true,
      status: 200,
      message: 'Example endpoint',
      data: {}
    });
  }
};
