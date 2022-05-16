/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * @providesModule site-constants
 * @flow
 */

// NOTE: We can't just use `location.toString()` because when we are rendering
// the SSR part in node.js we won't have a proper location.
<<<<<<< HEAD
const urlRoot = 'https://hu.reactjs.org';
const version = '17.0.2';
=======
const urlRoot = 'https://reactjs.org';
const version = '18.1.0';
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4
const babelURL = 'https://unpkg.com/babel-standalone@6.26.0/babel.min.js';

export {babelURL, urlRoot, version};
