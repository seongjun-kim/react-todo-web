import React from 'react';
import { fireEvent, getByAltText, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoListProvider } from 'Contexts';
import { ToDoList } from './index';

describe('<ToDoList />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>,
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('shows toDo list', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    render(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>,
    );

    expect(screen.getByText(sampleData[0])).toBeInTheDocument();
    expect(screen.getByText(sampleData[1])).toBeInTheDocument();
    expect(screen.getByText(sampleData[2])).toBeInTheDocument();
    expect(screen.getAllByText('Delete').length).toBe(3);
  });

  it('deletes toDo item', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    render(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>,
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
});
