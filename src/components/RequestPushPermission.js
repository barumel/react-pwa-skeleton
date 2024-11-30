import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import axios from 'axios';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import urlBase64ToUint8Array from '../lib/Utils/urlBase64ToUint8Array';

class RequestPushPermission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subscribed: false
    };

    this.onSubscribe = this.onSubscribe.bind(this);
    this.onTestNotification = this.onTestNotification.bind(this);
  }

  /**
   * Check if the button should be rendered (no active subscription)
   *
   * @return  void
   */
  async componentDidMount() {
    await navigator.serviceWorker.ready;
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration.pushManager.getSubscription();

    if (!isNil(subscription)) {
      this.setState({ subscribed: true });
    }
  }

  /**
   * Subscribe if the user clicks "allow"
   *
   * @return void
   */
  async onSubscribe() {
    await navigator.serviceWorker.ready;
    const registration = await navigator.serviceWorker.getRegistration();

    // Get the server's public key
    const { data } = await axios({
      url: `https://${window.location.hostname}:8080/vapidPublicKey`,
      method: 'get'
    });

    const applicationServerKey = urlBase64ToUint8Array(data.publicKey);

    const subscription = registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    });

    // Subscribe
    await axios({
      url: `https://${window.location.hostname}:8080/subscribe`,
      method: 'post',
      data: JSON.stringify({
        subscription
      })
    });

    this.setState({ subscribed: true });
  }

  /**
   * Let the server send us a test notification
   *
   * @return  void
   */
  async onTestNotification() {
    await navigator.serviceWorker.ready;
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration.pushManager.getSubscription();

    await axios({
      url: `https://${window.location.hostname}:8080/test-notification`,
      method: 'post',
      data: {
        subscription
      }
    });
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { subscribed } = this.state;

    return (
      <div className="request-push-permission">
        {!subscribed && (
          <Button
            color="primary"
            onClick={this.onSubscribe}
          >
            <FormattedMessage id="General.RequestPushPermission.Subscribe" />
          </Button>
        )}

        {subscribed && (
          <Button
            color="primary"
            onClick={this.onTestNotification}
          >
            <FormattedMessage id="General.RequestPushPermission.TestNotification" />
          </Button>
        )}
      </div>
    );
  }
}

RequestPushPermission.propTypes = {

};

RequestPushPermission.defaultProps = {

};

export default RequestPushPermission;
