import test from 'ava';
import app from '../';
import source from './source/index-test';

test('fromVisitors test', t => t.pass());
source(app, '/source');
