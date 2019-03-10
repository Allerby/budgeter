import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';
import RSVP, { reject } from 'rsvp';
import config from 'budgeter/config/environment';
import fetch from 'fetch';

const decode = str => {
  if (typeof atob === 'function') {
    return atob(str);
  } else if (typeof FastBoot === 'object') {
    try {
      const buffer = FastBoot.require('buffer');
      return buffer.Buffer.from(str, 'base64').toString('utf-8');
    } catch (err) {
      throw new Error('buffer must be available for decoding base64 strings in FastBoot. Make sure to add buffer to your fastbootDependencies.');
    }
  } else {
    throw new Error('Neither atob nor the FastBoot global are avaialble. Unable to decode base64 strings.');
  }
};

export default ToriiAuthenticator.extend({
  torii: service(),

  authenticate() {
    const tokenExchangeUri = config.torii.providers['google-oauth2'].tokenExchangeUri;
    return this._super(...arguments).then((data) => {
      const options = { 
        method: 'POST',
        headers: {
          'Data-type': 'json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ code: data.authorizationCode }) 
      };
      return fetch(tokenExchangeUri, options).then(response => response.json()).then((apiData) => {
        const tokenData = this.getTokenData(apiData.token);
        
        return {
          token: apiData.token,
          tokenData: tokenData,
          provider: data.provider
        };
      });
    });
  },

  invalidate(data) {
    return new RSVP.Promise((resolve) => {
      return resolve(data);
    }, () => {
      return reject(data);
    });
  },
  
  restore(data) {
    return new RSVP.Promise((resolve) => {
      return resolve(data);
    }, () => {
      return reject(data);
    });
  },

  /**
    Returns the decoded token with accessible returned values.
    @method getTokenData
    @return {object} An object with properties for the session.
  */
  getTokenData(token) {
    const payload = token.split('.')[1];
    const decodedPayload = decode(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const tokenData = decodeURIComponent(window.escape(decodedPayload));

    try {
      return JSON.parse(tokenData);
    } catch (error) {
      return tokenData;
    }
  },
});