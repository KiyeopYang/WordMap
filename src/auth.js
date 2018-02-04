import HttpBearer from 'passport-http-bearer';
import { Person } from './models';

const { Strategy } = HttpBearer;

export default function (passport) {
  // PASSPORT SETTING
  passport.use(new Strategy((_id, cb) => {
    Person.findOne({ _id }).lean().exec((err, result) => {
      if (err) { return cb(null, false); }
      if (!result) { return cb(null, false); }
      return cb(null, result);
    });
  }));
}
