'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import q from 'q';

let request = Electron.remote.require('superagent');

export default class Resource {
  constructor(settings) {
    this.base = settings.url;
    this.resource = settings.name;
    this.url = this.base + '/' + this.resource;
    this.headers = {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Basic '+ settings.authorization};
  }

  get(path) {
    var def = q.defer();

    configure(request.get(this.url + (this.path || '')), this.headers)
      .end(response(def));

    return def.promise;
  }

  put(path, data) {
    var def = q.defer();

    configure(request.put(this.url + (this.path || '')), this.headers)
      .send(data)
      .end(response(def));

    return def.promise;
  }

  post(path, data) {
    var def = q.defer();

    configure(request.post(this.url + (this.path || '')), this.headers)
      .send(data)
      .end(response(def));

    return def.promise;
  }

  delete(path) {
    var def = q.defer();

    configure(request.delete(this.url + (this.path || '')), this.headers)
      .end(response(def));

    return def.promise;
  }
}

function response(def) {
  return function(err, res) {
    if(err) {
      def.reject(err.response);
    } else {
      def.resolve(res.body);
    }
  }
}


function configure(req, headers) {
  for(var prop in headers) {
    req.set(prop, headers[prop]);
  }

  return req;
}