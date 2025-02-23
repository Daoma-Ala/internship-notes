import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';



const PLUGIN_NAME = 'WorksSkillsPlugin';

export default class WorksSkillsPlugin extends FlexPlugin {
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
    console.log('--------------------------------')
    const workers = manager.workerClient.workers;

  
    flex.AgentDesktopView.Content.add(
      <div key="custom-tab-content">
        <h3>Titulo</h3>
        <p>Hola adas</p>
      </div>

    );

  }


}
