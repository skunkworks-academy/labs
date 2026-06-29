/*
 * Skunkworks Academy OWASP Top 10:2025 vulnerable training app.
 * WARNING: intentionally insecure. Use only in an isolated local lab.
 */

const express = require('express');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Intentionally leaves X-Powered-By enabled for Lab 2.

const users = [
  { id: 1, email: 'alice@example.test', password: 'Password1!', role: 'student', displayName: 'Alice Learner', verified: false, balance: 1000 },
  { id: 2, email: 'bob@example.test', password: 'Password1!', role: 'student', displayName: 'Bob Learner', verified: false, balance: 800 },
  { id: 3, email: 'admin@example.test', password: 'Admin123!', role: 'admin', displayName: 'Admin User', verified: true, balance: 0 }
];

const orders = [
  { id: 101, customer: 'alice', item: 'Cloud lab voucher', amount: 120 },
  { id: 102, customer: 'alice', item: 'Security workshop', amount: 250 },
  { id: 201, customer: 'bob', item: 'Linux lab voucher', amount: 90 },
  { id: 301, customer: 'admin', item: 'Partner cohort report', amount: 0 }
];

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return Object.fromEntries(header.split(';').filter(Boolean).map(part => {
    const index = part.indexOf('=');
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1))];
  }));
}

function getSession(req) {
  const cookies = parseCookies(req);
  if (!cookies.skw_session) return null;
  try {
    return JSON.parse(Buffer.from(cookies.skw_session, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function requireLogin(req, res, next) {
  const session = getSession(req);
  if (!session) return res.status(401).send('Login required');
  req.session = session;
  next();
}

function weakToken(user) {
  // Intentionally weak for Lab 4: deterministic token using unsuitable construction.
  return crypto.createHash('md5').update(`skw-static-secret:${user}`).digest('hex');
}

function page(title, body) {
  return `<!doctype html>
<html lang="en-ZA">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;margin:2rem;line-height:1.5;max-width:920px}
    code,pre{background:#f4f4f5;padding:.2rem .35rem;border-radius:.25rem}
    .card{border:1px solid #ddd;border-radius:12px;padding:1rem;margin:1rem 0}
    a{color:#0f62fe}
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${body}
</body>
</html>`;
}

app.get('/', (req, res) => {
  const session = getSession(req);
  res.send(page('Skunkworks OWASP Top 10 Lab App', `
    <p><strong>Warning:</strong> intentionally vulnerable local training app. Do not expose publicly.</p>
    <div class="card">
      <h2>Login</h2>
      <form method="post" action="/login">
        <label>Email <input name="email" value="alice@example.test"></label><br>
        <label>Password <input name="password" value="Password1!" type="password"></label><br>
        <button type="submit">Login</button>
      </form>
      <p>Users: alice@example.test / Password1!, bob@example.test / Password1!, admin@example.test / Admin123!</p>
      <p>Current session: <code>${session ? JSON.stringify(session) : 'none'}</code></p>
    </div>
    <div class="card">
      <h2>Lab routes</h2>
      <ul>
        <li><a href="/profile/1">/profile/1</a> and <a href="/profile/2">/profile/2</a></li>
        <li><a href="/admin/debug">/admin/debug</a></li>
        <li><a href="/orders?customer=alice">/orders?customer=alice</a></li>
        <li><a href="/orders?customer=%27%20OR%20%271%27=%271">/orders?customer=' OR '1'='1</a></li>
        <li><a href="/token-demo?user=alice">/token-demo?user=alice</a></li>
        <li><a href="/comment?message=Hello">/comment?message=Hello</a></li>
        <li><a href="/calculate?items=abc">/calculate?items=abc</a></li>
        <li><a href="/authorize?mode=fail-open">/authorize?mode=fail-open</a></li>
        <li><a href="/log?event=login_failed">/log?event=login_failed</a></li>
      </ul>
    </div>
  `));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    console.log(`AUTH_FAIL email=${email}`);
    return res.status(401).send('Invalid credentials');
  }
  // Intentionally insecure for Lab 7: unsigned, client-editable session.
  const session = Buffer.from(JSON.stringify({ id: user.id, email: user.email, role: user.role }), 'utf8').toString('base64');
  res.setHeader('Set-Cookie', `skw_session=${encodeURIComponent(session)}; Path=/; SameSite=Lax`);
  res.redirect('/');
});

app.get('/profile/:id', requireLogin, (req, res) => {
  // Intentionally vulnerable for Lab 1: missing ownership check.
  const user = users.find(u => String(u.id) === String(req.params.id));
  if (!user) return res.status(404).send('Not found');
  res.json({ id: user.id, email: user.email, role: user.role, displayName: user.displayName, verified: user.verified, balance: user.balance });
});

app.get('/admin/debug', (req, res) => {
  // Intentionally vulnerable for Lab 2: no auth and too much diagnostic information.
  res.json({
    node: process.version,
    env: process.env.NODE_ENV || 'development',
    cwd: process.cwd(),
    headers: req.headers,
    usersLoaded: users.length,
    warning: 'Debug endpoint exposed intentionally for training.'
  });
});

app.get('/orders', (req, res) => {
  const customer = req.query.customer || '';
  const simulatedQuery = `SELECT * FROM orders WHERE customer = '${customer}'`;
  // Intentionally vulnerable simulation for Lab 5.
  if (customer.includes("' OR '1'='1")) {
    return res.json({ simulatedQuery, result: orders });
  }
  res.json({ simulatedQuery, result: orders.filter(o => o.customer === customer) });
});

app.get('/comment', (req, res) => {
  // Intentionally vulnerable for Lab 5: reflected XSS.
  const message = req.query.message || '';
  res.send(page('Comment Preview', `<p>Preview:</p><div class="card">${message}</div>`));
});

app.get('/token-demo', (req, res) => {
  const user = req.query.user || 'anonymous';
  res.json({ user, token: weakToken(user), warning: 'Weak deterministic token generated intentionally for training.' });
});

app.post('/transfer', (req, res) => {
  // Intentionally vulnerable for Lab 6: no business rules.
  const { from, to, amount } = req.body;
  res.json({
    status: 'accepted',
    from,
    to,
    amount,
    message: 'Transfer accepted without validating ownership, positive amount, or transaction limits.'
  });
});

app.post('/import-profile', (req, res) => {
  // Intentionally vulnerable for Lab 8: mass assignment.
  const incoming = req.body;
  const user = users.find(u => String(u.id) === String(incoming.id));
  if (!user) return res.status(404).send('User not found');
  Object.assign(user, incoming);
  res.json({ status: 'updated', user });
});

app.get('/log', (req, res) => {
  // Intentionally vulnerable for Lab 9: log injection.
  const event = req.query.event || 'unknown';
  console.log(`INFO event=${event}`);
  res.send(`Logged event: ${event}`);
});

app.get('/calculate', (req, res) => {
  try {
    const raw = req.query.items || '';
    const items = raw.split(',').map(Number);
    if (items.some(Number.isNaN)) {
      throw new Error(`Invalid item list received: ${raw}; diagnostic=SKW-LAB-ONLY-SECRET`);
    }
    const total = items.reduce((sum, n) => sum + n, 0);
    res.json({ total });
  } catch (err) {
    // Intentionally vulnerable for Lab 10: verbose error.
    res.status(500).send(`<pre>${err.stack}</pre>`);
  }
});

app.get('/authorize', (req, res) => {
  const mode = req.query.mode || 'normal';
  try {
    if (mode === 'fail-open') throw new Error('Authorization service timeout');
    res.json({ authorized: false });
  } catch (err) {
    // Intentionally vulnerable for Lab 10: fail open.
    res.json({ authorized: true, reason: 'Authorization service failed, defaulted to allow.' });
  }
});

app.listen(port, () => {
  console.log(`Skunkworks OWASP vulnerable lab app running at http://localhost:${port}`);
  console.log('WARNING: intentionally vulnerable. Local training use only.');
});
