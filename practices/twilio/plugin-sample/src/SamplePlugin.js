import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskList from './components/CustomTaskList/CustomTaskList';

const PLUGIN_NAME = 'SamplePlugin';

export default class SamplePlugin extends FlexPlugin {
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
 
    flex.NoTasksCanvas
    .Content
    .add(
      <div style={{ color: "red", padding: 20 }} key="warning">
        You are not available to receive tasks!
      </div>,
      {
        if: props => props.worker.activity.available === false
      });
      flex.AgentDesktopView.Content.add(
        <div key="custom-tab-content">
          <h3>Mi Pestaña Personalizada</h3>
          <p>Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.Contenido personalizado en la pestaña.</p>
        </div>
      );



      
      
  }
}
