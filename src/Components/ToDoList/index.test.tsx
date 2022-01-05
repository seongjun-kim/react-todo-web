import React from 'react';
import { fireEvent, getByAltText, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoListProvider } from 'Contexts';
import { ToDoList } from './index';
import { renderWithRouter } from 'Libs/utils';
import { useLocation } from 'react-router-dom';

describe('<ToDoList />', () => {
  it('renders component correctly', () => {
    const { container } = renderWithRouter(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>,
      { route: '/' },
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('shows toDo list', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    renderWithRouter(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>,
      { route: '/' },
    );

    const toDoItem0 = screen.getByText(sampleData[0]);
    expect(toDoItem0).toBeInTheDocument();
    expect(toDoItem0.getAttribute('href')).toBe('/detail/0');
    const toDoItem1 = screen.getByText(sampleData[1]);
    expect(toDoItem1).toBeInTheDocument();
    expect(toDoItem1.getAttribute('href')).toBe('/detail/1');
    const toDoItem2 = screen.getByText(sampleData[2]);
    expect(toDoItem2).toBeInTheDocument();
    expect(toDoItem2.getAttribute('href')).toBe('/detail/2');

    expect(screen.getAllByText('Delete').length).toBe(3);
  });

  it('deletes toDo item', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    renderWithRouter(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>,
      { route: '/' },
    );

    /*
     * 내가 작성한 방식
        const deleteButtons = screen.getAllByText('Delete') as HTMLElement[];
        const targetToDoItem = screen.getByText(sampleData[0]);

        expect(targetToDoItem).toBeInTheDocument();
        expect(screen.getAllByText('Delete').length).toBe(3);
        fireEvent.click(deleteButtons[0]);
        // expect(screen.getByText(sampleData[0])).not.toBeInTheDocument(); // 위에서 해당 컴포넌트를 미리 파악해두지 않으면, 지운 뒤에는 getByText 결과가 없어 활용할 수 없다.
        expect(targetToDoItem).not.toBeInTheDocument();
        expect(screen.getAllByText('Delete').length).toBe(2);
    */

    /* 책에서 제시한 방식
     * 1. toDoItem의 nextElementSibling 속성을 활용해 버튼 컴포넌트를 활용했다.
     * 2. 버튼 클릭 이벤트인 deleteToDo 함수 수행 이후,
     *   화면에서의 toDoItem 갯수가 줄어듦을 파악하는 것이 아닌 로컬스토리지에서 해당 toDoItem의 유무를 파악했다.
     */

    const toDoItem = screen.getByText(sampleData[0]);
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem.nextElementSibling as HTMLElement);
    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain(sampleData[0]);
  });

  it('moves to detail page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    renderWithRouter(
      <>
        <TestComponent />
        <ToDoListProvider>
          <ToDoList />
        </ToDoListProvider>
      </>,
      { route: '/' },
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const toDoItem1 = screen.getByText(sampleData[0]);
    expect(toDoItem1.getAttribute('href')).toBe('/detail/0');
    fireEvent.click(toDoItem1);

    expect(url.textContent).toBe('/detail/0');
  });
});
