import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom'
import Reload from './Reload';

test('Reload calls mutate when clicked', () => {
  const mutate = jest.fn()
  const { getByText } = render(<Reload mutate={mutate}/>);
  const reloadButton = getByText(/reload/i);

  fireEvent.click(reloadButton)

  expect(mutate).toBeCalledTimes(1)
  expect(mutate).toBeCalledWith('/images/search?limit=50')
});
