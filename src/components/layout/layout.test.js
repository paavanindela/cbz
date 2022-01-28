import React from 'react';
import { shallow, render, mount } from 'enzyme';
import layout from './layout';

describe('layout', () => {
  let props;
  let shallowlayout;
  let renderedlayout;
  let mountedlayout;

  const shallowTestComponent = () => {
    if (!shallowlayout) {
      shallowlayout = shallow(<layout {...props} />);
    }
    return shallowlayout;
  };

  const renderTestComponent = () => {
    if (!renderedlayout) {
      renderedlayout = render(<layout {...props} />);
    }
    return renderedlayout;
  };

  const mountTestComponent = () => {
    if (!mountedlayout) {
      mountedlayout = mount(<layout {...props} />);
    }
    return mountedlayout;
  };  

  beforeEach(() => {
    props = {};
    shallowlayout = undefined;
    renderedlayout = undefined;
    mountedlayout = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
