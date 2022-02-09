const utils = require('./utils/fs');
const path = require('path');

class StateStorage {
  constructor() {
    this.stateRoot = path.join(process.cwd(), '.serverless');
  }

  async readServiceState(defaultState) {
    await this.readState();

    if (this.state.service === undefined) {
      this.state.service = defaultState;
      await this.writeState();
    }

    return this.state.service;
  }

  async readComponentState(componentId) {
    await this.readState();

    return this.state.components?.[componentId]?.state ?? {};
  }

  async writeComponentState(componentId, componentState) {
    await this.readState();

    this.state.components = this.state.components ?? {};
    this.state.components[componentId] = this.state.components[componentId] ?? {};
    this.state.components[componentId].state = componentState;

    await this.writeState();
  }

  async readRootComponentsOutputs() {
    await this.readState();

    if (!this.state.components) {
      return {};
    }

    const outputs = {};
    for (const [id, data] of Object.entries(this.state.components)) {
      outputs[id] = data.outputs ?? {};
    }
    return outputs;
  }

  async readComponentOutputs(componentId) {
    await this.readState();

    return this.state.components?.[componentId]?.outputs ?? {};
  }

  async writeComponentOutputs(componentId, componentOutputs) {
    await this.readState();

    this.state.components = this.state.components ?? {};
    this.state.components[componentId] = this.state.components[componentId] ?? {};
    this.state.components[componentId].outputs = componentOutputs;

    await this.writeState();
  }

  async readState() {
    // Load the state only once
    // We will assume it doesn't change outside of our process
    // TODO add locking mechanism in the future
    if (this.state === undefined) {
      const stateFilePath = path.join(this.stateRoot, 'state.json');
      if (await utils.fileExists(stateFilePath)) {
        this.state = await utils.readFile(stateFilePath);
      } else {
        this.state = {};
      }
    }
    return this.state;
  }

  async writeState() {
    const stateFilePath = path.join(this.stateRoot, 'state.json');
    await utils.writeFile(stateFilePath, this.state);
  }
}

module.exports = StateStorage;