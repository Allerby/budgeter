import Controller from "@ember/controller";
import { inject as service } from '@ember/service';
import ENV from 'budgeter/config/environment';

export default class ApplicationController extends Controller {
  @service()
  router;

  environment = ENV.environment;
}