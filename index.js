//Basic API without Express

const http = require('http');

const server = http.createServer((req, res) => {
  // Set response type to JSON
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Hello from Node API!'
    }));
  } 
  else if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify([
      { id: 1, name: 'Kriti' },
      { id: 2, name: 'John' }
    ]));
  } 
  else {
    res.writeHead(404);
    res.end(JSON.stringify({
      error: 'Route not found'
    }));
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});