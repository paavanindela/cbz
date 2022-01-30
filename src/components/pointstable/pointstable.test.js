import React from 'react';
import { shallow, render, mount } from 'enzyme';
import pointstable from './pointstable';

describe('pointstable', () => {
  let props;
  let shallowpointstable;
  let renderedpointstable;
  let mountedpointstable;

  const shallowTestComponent = () => {
    if (!shallowpointstable) {
      shallowpointstable = shallow(<pointstable {...props} />);
    }
    return shallowpointstable;
  };

  const renderTestComponent = () => {
    if (!renderedpointstable) {
      renderedpointstable = render(<pointstable {...props} />);
    }
    return renderedpointstable;
  };

  const mountTestComponent = () => {
    if (!mountedpointstable) {
      mountedpointstable = mount(<pointstable {...props} />);
    }
    return mountedpointstable;
  };  

  beforeEach(() => {
    props = {};
    shallowpointstable = undefined;
    renderedpointstable = undefined;
    mountedpointstable = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
