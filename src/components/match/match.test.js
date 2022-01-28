import React from 'react';
import { shallow, render, mount } from 'enzyme';
import match from './match';

describe('match', () => {
  let props;
  let shallowmatch;
  let renderedmatch;
  let mountedmatch;

  const shallowTestComponent = () => {
    if (!shallowmatch) {
      shallowmatch = shallow(<match {...props} />);
    }
    return shallowmatch;
  };

  const renderTestComponent = () => {
    if (!renderedmatch) {
      renderedmatch = render(<match {...props} />);
    }
    return renderedmatch;
  };

  const mountTestComponent = () => {
    if (!mountedmatch) {
      mountedmatch = mount(<match {...props} />);
    }
    return mountedmatch;
  };  

  beforeEach(() => {
    props = {};
    shallowmatch = undefined;
    renderedmatch = undefined;
    mountedmatch = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
