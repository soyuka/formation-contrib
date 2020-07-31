import React, {Suspense} from 'react';
import { render } from '@testing-library/react';
import { fireEvent, waitForElement } from '@testing-library/dom'
import CatList from './CatList';
import cats from './__mocks__/cats.json'

const noop = () => {}
const userId = 'user'

test('CatList should show cat list', async () => {
  const fetcher = jest.fn().mockImplementation((url, options) => {
    return new Promise((resolve, reject) => {
      if (url === `/favourites?sub_id=${userId}&limit=1000`) {
        resolve([])
        return
      }

      if (url === '/images/search?limit=50') {
        resolve(cats)
        return
      }

      reject(new Error('Bad url'))
    })
  })

  const { getAllByLabelText, getByLabelText } = render(<Suspense fallback={<div>Loading...</div>}><CatList favorite={noop} unfavorite={noop} userId={userId} fetcher={fetcher}/></Suspense>);

  await waitForElement(() => getByLabelText(/grid list/i));
  await waitForElement(() => getAllByLabelText(/cat image/i));

  expect(getAllByLabelText(/cat image/i).length).toEqual(cats.length)
});

