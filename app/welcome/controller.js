import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default class WelcomeController extends Controller {
  @service()
  session;

  queryParams = ['option'];
  option = null;
}