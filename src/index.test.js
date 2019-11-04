jest.mock('react-dom', () => ({render: jest.fn()}));
import { render } from 'react-dom';
import Index from './index'

it('does render', () => {
    expect(render.mock.calls.length).toBe(1);
});

