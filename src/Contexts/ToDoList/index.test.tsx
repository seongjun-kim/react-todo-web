import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ToDoListContext, ToDoListProvider } from './index';
import { useContext } from 'react';

beforeEach(() => {
  localStorage.clear();
});

describe('ToDoList Context', () => {
  it('renders component correctly', () => {
    const ChildComponent = () => {
      return <div>Child Component</div>;
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>,
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
    expect(localStorage.getItem('ToDoList')).toBeNull();
  });

  it('loads localStorage data and sets it to State', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    const ChildComponent = () => {
      const { toDoList } = useContext(ToDoListContext);
      return (
        <div>
          {toDoList.map((toDo) => (
            <div key={toDo}>{toDo}</div>
          ))}
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>,
    );

    expect(screen.getByText('ToDo 1')).toBeInTheDocument();
    expect(screen.getByText('ToDo 2')).toBeInTheDocument();
    expect(screen.getByText('ToDo 3')).toBeInTheDocument();
  });

  it('uses addToDo function', () => {
    const sampleData = ['New ToDo'];
    const ChildComponent = () => {
      const { toDoList, addToDo } = useContext(ToDoListContext);
      return (
        <div>
          <div
            onClick={() => {
              addToDo(sampleData[0]);
            }}>
            Add
          </div>
          <div>
            {toDoList.map((toDo) => (
              <div key={toDo}>{toDo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>,
    );

    expect(localStorage.getItem('ToDoList')).toBeNull();
    const button = screen.getByText('Add');
    fireEvent.click(button);
    expect(screen.getByText('New ToDo')).toBeInTheDocument();
    expect(localStorage.getItem('ToDoList')).toBe(JSON.stringify(sampleData));
  });

  it('uses deleteToDo function', () => {
    const sampleData = ['ToDo 1', 'ToDo 2'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    const ChildComponent = () => {
      const { toDoList, deleteToDo } = useContext(ToDoListContext);
      return (
        <div>
          {toDoList.map((toDo, index) => (
            // ?????? ??????(deleteToDo)??? ????????? ???????????? ??????????????????,
            // ?????? ?????? ?????? ????????? ???????????? ?????? ????????? ??????!
            // ????????? ?????? ????????? ???????????? ????????? ?????? ??????????????? ?????? ????????? ???????????????.
            // (?????? A) ?????? ?????? ????????? ?????? ????????? ??????
            // <div key={toDo}>
            //   <div>{toDo}</div>
            //   <div onClick={() => deleteToDo(index)}>Delete</div>
            // </div>
            // (?????? B) ????????? ???????????? ????????? ?????? ???????????? ??????
            <div key={toDo} onClick={() => deleteToDo(index)}>
              {toDo}
            </div>
          ))}
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>,
    );

    // (????????? A)
    // const deleteButtons = screen.getAllByText('Delete');
    // expect(JSON.parse(localStorage.getItem('ToDoList') as string).length).toBe(sampleData.length);
    // fireEvent.click(deleteButtons[1]);
    // expect(JSON.parse(localStorage.getItem('ToDoList') as string).length).toBe(
    //   sampleData.length - 1,
    // );

    // (????????? B)
    const targetLabel = sampleData[1];
    const targetToDoItem = screen.getByText(targetLabel);
    expect(targetToDoItem).toBeInTheDocument();
    fireEvent.click(targetToDoItem);
    expect(targetToDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain(targetLabel);
  });
});
