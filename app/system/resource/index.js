'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import Electron from 'electron';
import * as Security from '../security';
import Settings from '../settings';
import q from 'q';

let request = Electron.remote.require('superagent');
let settings = Security.decrypt(Settings.get('user'));

export default class Resource {
  constructor(name, opts) {
    this.base = settings.api;
    this.resource = name;
    this.url = this.base + '/' + this.resource;
    this.headers = {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Basic '+ btoa(settings.email+':'+settings.password)};
  }

  get(segments) {
    var def = q.defer();

    configure(request.get(buildURL(this.url, segments)), this.headers)
      .end(response(def));

    return def.promise;
  }

  put(segments, data) {
    var def = q.defer();

    configure(request.put(buildURL(this.url, segments)), this.headers)
      .send(data)
      .end(response(def));

    return def.promise;
  }

  post(segments, data) {
    var def = q.defer();

    configure(request.post(buildURL(this.url, segments)), this.headers)
      .send(data)
      .end(response(def));

    return def.promise;
  }

  delete(segments) {
    var def = q.defer();

    configure(request.delete(buildURL(this.url, segments)), this.headers)
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

function buildURL(url, segments) {
  segments = segments || {};

  Object.keys(segments)
    .forEach(function(segment) {
      url = url.replace(':'+segment, segments[segment]);
    });

  return url;
}