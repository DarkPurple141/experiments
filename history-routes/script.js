const routes = {
  '/': '<h1>Home Page</h1>',
  '/login': '<h1>Login Page</h1>'
};

const root = document.getElementById('root');

function router(oldPath, newPath) {
  if (oldPath === newPath) {
    return;
  }
  // get the actual 'path'
  const { pathname: path } = new URL(newPath);

  if (path in routes) {
    // do some actual logic
    history.pushState(null, null, path)
    root.innerHTML = routes[path];
  } else {
    // no match so redirect to home
    history.pushState(null, null, '/')
  }
}

function createLink(text, href) {
  const link = document.createElement('a');

  link.textContent = text;
  link.href = href;

  return link;
}

function updateRoute(e) {
  // update meta
  e.preventDefault();
  e.stopPropagation();
  const { href } = e.target;

  router(location.href, href);
}

function runApp() {
  const homeLink  = createLink('Home', '/');
  const loginLink = createLink('Login', '/login');

  const links = document.createElement('div');
  links.addEventListener('click', updateRoute, false);

  links.append(homeLink, ' | ', loginLink);

  document.body.appendChild(links)

  // start router
  router(null, location.href);
}

export { 
  runApp
};