import { render, screen } from '@testing-library/react';

import { CITIES } from '../../const';
import { CityLine } from '..';
import { withStoreAndHistory } from '../../utils/mock-component';

describe('Component <CityLine />:', () => {
  it('should render correct', () => {
    const cityListContainerId = 'tabs-container';
    const cityItemId = 'city-tab';
    const { withStoreComponent: wrappedComponent } = withStoreAndHistory(<CityLine />);

    render(wrappedComponent);
    const cityListContainer = screen.getByTestId(cityListContainerId);
    const cityItems = screen.getAllByTestId(cityItemId);

    expect(cityListContainer).toBeInTheDocument();
    expect(cityItems.length).toBe(CITIES.length);
  });
});
