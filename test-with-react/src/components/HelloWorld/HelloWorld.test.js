import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import HelloWorld from './HelloWorld';

// Jest test api is very similar to Jasmine

describe('HelloWorld Component should greet the world in two languages', () => {

    const component = shallow(
        <HelloWorld />
    );

    it('Starts with an english greeting', () => {
        expect(component.text()).toContain('Hello');
    });

    it('Modifies the greeting when french button is clicked', () => {
        component.find('button.js-french').simulate('click');
        expect(component.text()).toContain('Bonjour');
    });

});
