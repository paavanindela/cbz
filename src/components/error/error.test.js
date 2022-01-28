import React from 'react';
import { shallow, render, mount } from 'enzyme';
import error from './error';

describe('error', () => {
  let props;
  let shallowerror;
  let renderederror;
  let mountederror;

  const shallowTestComponent = () => {
    if (!shallowerror) {
      shallowerror = shallow(<error {...props} />);
    }
    return shallowerror;
  };

  const renderTestComponent = () => {
    if (!renderederror) {
      renderederror = render(<error {...props} />);
    }
    return renderederror;
  };

  const mountTestComponent = () => {
    if (!mountederror) {
      mountederror = mount(<error {...props} />);
    }
    return mountederror;
  };  

  beforeEach(() => {
    props = {};
    shallowerror = undefined;
    renderederror = undefined;
    mountederror = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
