import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import FeatherTheme from './FeatherCorpTheme';
import QuoteComponent from './components/Quote/Quote'

const PLUGIN_NAME = 'StateWarningPlugin';


export default class StateWarningPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {


    /*
    flex.NoTasksCanvas.Content.add(
      <div style={{ color: "red", padding: 20 }} key="warning">
        You are not available to receive tasks!
      </div>, {
      if: props => props.worker.activity.available === false
    });

*/

    // set logo
    flex.MainHeader.defaultProps.logoUrl =
      'https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg';

    // set color theme
    manager.updateConfig({
      theme: {
        isLight: true, // o false si el tema es oscuro
        overrides: FeatherTheme
      }
    });

    // remove default components
    flex.NoTasksCanvas.Content.remove('first-line');
    flex.NoTasksCanvas.Content.remove('second-line');
    flex.NoTasksCanvas.Content.remove('hint');

    // add our quote component
    flex.NoTasksCanvas.Content.add(<QuoteComponent key="qotd" />, {
      sortOrder: -1
    });
  }
}
