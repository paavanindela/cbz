import React from 'react';
import { shallow, render, mount } from 'enzyme';
import venues from './venues';

describe('venues', () => {
  let props;
  let shallowvenues;
  let renderedvenues;
  let mountedvenues;

  const shallowTestComponent = () => {
    if (!shallowvenues) {
      shallowvenues = shallow(<venues {...props} />);
    }
    return shallowvenues;
  };

  const renderTestComponent = () => {
    if (!renderedvenues) {
      renderedvenues = render(<venues {...props} />);
    }
    return renderedvenues;
  };

  const mountTestComponent = () => {
    if (!mountedvenues) {
      mountedvenues = mount(<venues {...props} />);
    }
    return mountedvenues;
  };  

  beforeEach(() => {
    props = {};
    shallowvenues = undefined;
    renderedvenues = undefined;
    mountedvenues = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
