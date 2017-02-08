module.exports = {
  path: '/',
  method: 'GET',
  handler: (req, reply) => {
    reply.view('index');
  }
};
