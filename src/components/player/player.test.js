import React from 'react';
import { shallow, render, mount } from 'enzyme';
import player from './player';

describe('player', () => {
  let props;
  let shallowplayer;
  let renderedplayer;
  let mountedplayer;

  const shallowTestComponent = () => {
    if (!shallowplayer) {
      shallowplayer = shallow(<player {...props} />);
    }
    return shallowplayer;
  };

  const renderTestComponent = () => {
    if (!renderedplayer) {
      renderedplayer = render(<player {...props} />);
    }
    return renderedplayer;
  };

  const mountTestComponent = () => {
    if (!mountedplayer) {
      mountedplayer = mount(<player {...props} />);
    }
    return mountedplayer;
  };  

  beforeEach(() => {
    props = {};
    shallowplayer = undefined;
    renderedplayer = undefined;
    mountedplayer = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});
