'use strict';

/***********************************************************************************************************************************************
 * SUCCOTASH - DOMAINS - PROJECTS - LOCAL - COMPONENTS - ADD
 ***********************************************************************************************************************************************
 * @description
 */
import React from 'react';
import Electron from 'electron';
import Components from '~/src/components';
import Select from 'react-select';

/**
 *
 */
export default class Add extends React.Component {
  constructor(props) {
    super();

    this.state = {project: {}};
  }

  save(e) {
    e.preventDefault();
  }

  projectSelected(project) {
    this.setState({project: project})
  }

  render() {
    return (
      <Components.Layout.Section classes="add-component">
        <form onSubmit={this.save.bind(this)}>
          <Components.Layout.Columns classes={'is-multiline'}>
            <Components.Layout.Column width={12}>
              <div className="control">
                <label>Select Harvest Project</label>
                <Select options={this.props.projects} valueKey={'id'} labelKey={'name'} />
              </div>
              <div className="control">
                <label>Select Project Task</label>
                <Select options={this.state.project.task_assignments}
                  value={this.state.project.id}
                  valueKey={'id'}
                  labelKey={'name'}
                  onChange={this.projectSelected.bind(this)}
                  disabled={!this.state.project.task_assignments} />
              </div>
            </Components.Layout.Column>
            <Components.Layout.Column width={12}>
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
