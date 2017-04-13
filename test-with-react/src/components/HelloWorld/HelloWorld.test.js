import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import HelloWorld from './HelloWorld';

describe("HelloWorld Component should greet the world in two languages", () => {

    const component = shallow(
        <HelloWorld />
    );

    it('Modifies the greeting when french button is clicked', () => {
        component.find('button.js-french').simulate('click');
        expect(component.text()).toContain('Bonjour');
    });

});
