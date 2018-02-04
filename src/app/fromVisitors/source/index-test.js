import test from 'ava';
import supertest from 'supertest';

export default function (app, url) {
  test.serial('query data.jpg', async (t) => {
    const res = await supertest(app)
      .get(`${url}/data.jpg?abc=1`);
    t.is(res.status, 204);
  });
}
