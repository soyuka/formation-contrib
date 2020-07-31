import React, {Suspense} from 'react';
import { render } from '@testing-library/react';
import { fireEvent, waitForElement } from '@testing-library/dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import CatList from './CatList';
import cats from './__mocks__/cats.json'

const noop = () => {}
const userId = 'user'

const server = setupServer(
  rest.get(`/favourites?sub_id=${userId}&limit=1000`, (req, res, ctx) => {
    return res(ctx.json([]))
  }),
  rest.get(`/images/search?limit=50`, (req, res, ctx) => {
    return res(ctx.json(cats))
  }),
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())

test('CatList via API Mock', async () => {
  const fetcher = (url, options) => 
  fetch(url, {
    ...options, headers: {'x-api-key': 'e1dba036-ad1f-4f92-bb2a-19eec4279cf7', 'content-type': 'application/json'}
  }).then(r => r.json())
  const { getAllByLabelText, getByLabelText } = render(<Suspense fallback={<div>Loading...</div>}><CatList favorite={noop} unfavorite={noop} userId={userId} fetcher={fetcher}/></Suspense>);

  await waitForElement(() => getByLabelText(/grid list/i));
  await waitForElement(() => getAllByLabelText(/cat image/i));

  expect(getAllByLabelText(/cat image/i).length).toEqual(cats.length)

})
