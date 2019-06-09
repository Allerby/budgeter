import EmberRouter from '@ember/routing/router';
import config from './config/environment';

class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('home');
  this.route('register');
  this.route('welcome');
  this.route('setup', function() {
    this.route('upload');
    this.route('categorise');
  });
  this.route('playground');
});

export default Router;
