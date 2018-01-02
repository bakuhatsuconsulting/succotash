'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - DOMAINS - PROJECTS - LOCAL - COMPONENTS - ADD
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Electron from 'electron';
import Components from '~/src/components';

/**
 *
 */
export default class Add extends React.Component {
  constructor(props) {
    super();
  }

  save(e) {
    e.preventDefault();

  }

  render() {
    return (
      <Components.Layout.Section classes="add-component">
        <form onSubmit={this.save.bind(this)}>
          <Components.Layout.Columns>
            <Components.Layout.Column width={5}>
              <div className="control">
                <label>Select Harvest Project</label>
                <select name="harvest.project" ref="project" className="input"></select>
              </div>
              <div className="control">
                <label>Select Project Task</label>
                <select name="harvest.project.task" ref="project" className="input"></select>
              </div>
            </Components.Layout.Column>
            <Components.Layout.Column width={5}>
              <div className="control">
                <label>Choose Folder/File to watch.</label>
                <input type="file" name="directory" className="input" placeholder="directory to watch" ref="file"/>
              </div>
            </Components.Layout.Column>
            <Components.Layout.Column >
              <div className="control">
                <button className="button is-success" onClick={this.save.bind(this)}>Save</button>
              </div>
            </Components.Layout.Column>
          </Components.Layout.Columns>
        </form>
      </Components.Layout.Section>
    )
  }
}
