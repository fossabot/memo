import React from 'react';
import { mount } from 'enzyme';
import TohoLoading from '../TohoLoading';

describe('TohoLoading', () => {
  it('render correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(<TohoLoading currentNeta={['test1', 'test2']} />);
    jest.advanceTimersByTime(10000);
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    jest.useRealTimers();
  });
});
