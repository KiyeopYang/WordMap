import test from 'ava';
import app from '../';
import website from './website/index-test';

test('api test', t => t.pass());
website(app, '/api/website');
