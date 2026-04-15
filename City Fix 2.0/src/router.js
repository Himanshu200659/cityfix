/* ============================================
   CITYFIX – Hash-Based SPA Router
   ============================================ */

const Router = {
  currentRoute: 'home',
  routes: {},

  /**
   * Register route definitions
   */
  register(routes) {
    Router.routes = routes;
  },

  /**
   * Navigate to a route
   */
  navigate(route, params = {}) {
    let hash = `#/${route}`;
    if (Object.keys(params).length) {
      const query = new URLSearchParams(params).toString();
      hash += `?${query}`;
    }
    window.location.hash = hash;
  },

  /**
   * Handle route changes
   */
  handleRoute() {
    const hash = window.location.hash.slice(2) || 'home'; // Remove #/
    const routeName = hash.split('?')[0]; // Remove query params

    const routeConfig = Router.routes[routeName];
    if (!routeConfig) {
      Router.render404();
      return;
    }

    // Auth guard
    if (routeConfig.requiresAuth && !Auth.currentUser) {
      Toast.show('Please sign in to continue', 'warning');
      Router.navigate('login');
      return;
    }

    // Admin guard – requires officer login via AdminSession
    if (routeConfig.requiresAdmin && !AdminSession.isLoggedIn) {
      Toast.show('Officer login required', 'warning');
      Router.navigate('admin-login');
      return;
    }

    Router.currentRoute = routeName;

    // Render page
    const app = document.getElementById('app');
    if (app) {
      app.className = 'page-enter';
      app.innerHTML = routeConfig.page.render();
      
      // Init page
      if (routeConfig.page.init) {
        routeConfig.page.init();
      }

      // Scroll to top
      window.scrollTo(0, 0);
    }
  },

  /**
   * 404 Page
   */
  render404() {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        ${Navbar.render()}
        <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding-top:var(--navbar-height);">
          <div style="text-align:center;padding:40px;">
            <div style="font-size:6rem;margin-bottom:16px;">🏗️</div>
            <h1 style="margin-bottom:8px;">404 – Page Not Found</h1>
            <p style="margin-bottom:24px;color:var(--text-secondary);">The page you're looking for doesn't exist or has been moved.</p>
            <a href="#/home" class="btn btn-primary btn-lg">Go Home</a>
          </div>
        </div>
        ${Footer.render()}
      `;
      Navbar.init();
    }
  },

  /**
   * Initialize router
   */
  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => Router.handleRoute());

    // Handle initial route
    if (!window.location.hash) {
      window.location.hash = '#/home';
    } else {
      Router.handleRoute();
    }
  }
};
