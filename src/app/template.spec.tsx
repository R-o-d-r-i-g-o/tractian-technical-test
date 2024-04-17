import { render, screen } from '@testing-library/react';
import Template from './template';

import * as ReactQuery from '@tanstack/react-query';

describe('Template Component Test', () => {
  const useQueryMock = jest.spyOn(ReactQuery, 'useQuery').mockImplementation();

  it('render component properly', () => {
    render(<Template>{'Hello world!'}</Template>);

    const templateComp = screen.getByTestId('template-element');

    expect(screen.getByText(/Hello World/i)).toBeDefined();
    expect(templateComp).toBeDefined();
  });

  it('render context element properly', () => {
    expect(useQueryMock).toHaveBeenCalledTimes(1);
  });
});
