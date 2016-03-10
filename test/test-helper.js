/*
  We need to let plug in chai-immutable before any tests are run.
  That we can do in a little test helper file, which should create next:
 */

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);