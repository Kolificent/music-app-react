import { render, screen } from '@testing-library/react';
import MainMenu from './MainMenu';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// для тестирования приложения с React Router можно использовать компонент <MemoryRouter>
describe('#MainMenu', () => {
  it('render', () => {
    render(
      <MemoryRouter>
        <MainMenu />
      </MemoryRouter>,
    );
    const element = screen.getByText(/Главная/i);
    expect(element).toBeInTheDocument();
    userEvent.click(element);
    screen.debug();
  });
});
