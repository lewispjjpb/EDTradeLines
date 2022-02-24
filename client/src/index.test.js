import React from 'react';
import renderer from 'react-test-renderer';

import Main from './index.jsx';


const data = [['test value']];

const thing = () => 'test value'

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('values to match', () => {
  const component = renderer.create(
    <Main />
  )

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();


});

