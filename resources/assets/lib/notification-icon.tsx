// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

import { computed, observable, observe } from 'mobx';
import { observer } from 'mobx-react';
import { typeNames } from 'models/notification-type';
import core from 'osu-core-singleton';
import * as React from 'react';

interface Props {
  type?: string;
}

@observer
export default class NotificationIcon extends React.Component<Props> {
  @observable private hasConnectedOnce = false;

  @computed
  private get unreadCount() {
    // TODO: need a better way of propagating the exclusion list to this (but it's global anyway?)
    const types = typeNames.filter((name) => !(name == null || name === 'channel'));
    return types.reduce((acc, current) => {
      return acc + core.dataStore.notificationStore.unreadStacks.getOrCreateType({ objectType: current }).total;
    }, 0);
  }

  constructor(props: Props) {
    super(props);

    const disposer = observe(core.socketWorker, 'connectionStatus', (change) => {
      if (change.newValue === 'connected') {
        this.hasConnectedOnce = true;
        disposer();
      }
    }, true);
  }

  render() {
    return (
      <span className={this.mainClass()}>
        <i className='fas fa-inbox' />
        <span className='notification-icon__count'>
          {this.unreadCountDisplay()}
        </span>
      </span>
    );
  }

  private mainClass() {
    let ret = 'notification-icon';

    if (this.unreadCount > 0) {
      ret += ' notification-icon--glow';
    }

    if (this.props.type === 'mobile') {
      ret += ' notification-icon--mobile';
    }

    return ret;
  }

  private unreadCountDisplay() {
    if (this.hasConnectedOnce) {
      return osu.formatNumber(this.unreadCount);
    } else {
      return '...';
    }
  }
}
