'use strict';

/***********************************************************************************************************************************************
 * 
 ***********************************************************************************************************************************************
 * @description
 */
import jwt from 'jsonwebtoken';
const secret = 'WHARGHARBL'

/**
 * [encrypt description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function encrypt(data) {
  return jwt.sign(data, secret);
}

/**
 * [decrypt description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function decrypt(token) {
  return token && jwt.verify(token, secret) || null;
}