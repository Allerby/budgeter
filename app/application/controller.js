import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  store: service(),
  cable: service(),
  session: service(),

  init() {
    let consumer = this.get('cable').createConsumer('ws://localhost:4200/cable');
    let token = this.get('session.data.authenticated.currentUser.stsTokenManager.accessToken');
    let subscription = consumer.subscriptions.create({ channel: 'GeminoChannel', current_user_token:  token}, {
      connected() {
        this.send({});
      },
      received: (response) => {
        if (response.data) {
          console.log('response: ', response);
          this.get('store').pushPayload(response);
        } else {
          console.log('no data recieved');
        }
      },
      disconnected() {
        Ember.debug('GeminoChannel#disconnected');
      }
    });

    // Save consumer to controller to link up computed props
    this.set('subscription', subscription);
    this.set('consumer', consumer);
  },

  // Flag indicating a connection is being attempted
  isConnecting: readOnly('consumer.isConnecting'),

  actions: {
    firebaseVerification() {
      this.subscription.perform('firebase_login', {'token': token});
    },
  },
  
});