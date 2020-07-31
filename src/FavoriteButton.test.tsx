import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom'
import FavoriteButton from './FavoriteButton';

test('FavoriteButton calls favorite when clicked and the cat is not already favorited', () => {
  const favorite = jest.fn()
  const unfavorite = jest.fn()
  const cat = {id: 'id'}
  const { getByLabelText } = render(<FavoriteButton cat={cat} favorite={favorite} unfavorite={unfavorite} />);
  const favoriteButton = getByLabelText(/favorite this cat/i);

  fireEvent.click(favoriteButton)

  expect(favorite).toBeCalledTimes(1)
  expect(favorite).toBeCalledWith(cat.id)
  expect(unfavorite).not.toBeCalled()
});

test('FavoriteButton calls unfavorite when clicked and the cat is already favorited', () => {
  const favorite = jest.fn()
  const unfavorite = jest.fn()
  const cat = {id: 'id', favourited: {id: '123', image_id: 'image'}}
  const { getByLabelText } = render(<FavoriteButton cat={cat} favorite={favorite} unfavorite={unfavorite} />);
  const favoriteButton = getByLabelText(/favorite this cat/i);

  fireEvent.click(favoriteButton)

  expect(unfavorite).toBeCalledTimes(1)
  expect(unfavorite).toBeCalledWith(cat.favourited.id)
  expect(favorite).not.toBeCalled()
});
