import React from 'react';
import renderer from 'react-test-renderer';

import BuyGraph from './bGraph.jsx';


const data = [['test value']];

const thing = () => 'test value'

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('values to match', () => {
  const component = renderer.create(
    <BuyGraph />
  )

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.testClick('input')

  // expect(tree.props.testClick('the test').toBe('the test'));
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});

