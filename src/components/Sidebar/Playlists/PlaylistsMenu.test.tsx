import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlaylistsMenu from './PlaylistsMenu';

describe('#MainMenu', () => {
  it('render', () => {
    render(
      <MemoryRouter>
        <PlaylistsMenu />
      </MemoryRouter>,
    );
    const element = screen.getByText(/Плейлисты/i);
    expect(element).toBeInTheDocument();
  });
});
