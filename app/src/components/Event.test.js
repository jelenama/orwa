import React from 'react';
import { shallow, mount, configure  } from 'enzyme';
import AdminPage from '../pages/AdminPage';
import '@testing-library/jest-dom/extend-expect'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('broj inputa', () => {

    const wrapper = shallow(<AdminPage/>);

    expect(wrapper.find('input')).toHaveLength(9);
 });

 test('broj botuna', () => {

    const wrapper = shallow(<AdminPage/>);

    expect(wrapper.find('button')).toHaveLength(1);
 });