import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { ToDoListProvider } from 'Contexts';
import App from 'App';

/**
 * [renderWithRouter]
 * useLocation과 같은 라우터 관련 훅을 포함한 단일 컴포넌트 테스트를 위한 렌더링 함수
 * 컴포넌트 테스트를 위한 함수이므로 Components 폴더 아래 테스트에 활용
 */
export const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);
  return render(ui, { wrapper: BrowserRouter });
};

/**
 * [renderWithMemoryRouter]
 * 실제 앱에서의 구동 방식 테스트를 위한 렌더링 함수
 * 페이지 전환 테스트를 위한 함수이므로 Pages 폴더 아래 테스트에 활용
 *
 *  - initialEntries를 window.history 처럼 활용 가능
 *  - TestComponent를 활용한 앱 내 추가 컴포넌트 적용 테스트 가능
 *    - 주로 useLocation().pathname을 파악하는 용도로 활용
 */
export const renderWithMemoryRouter = (
  { initialIndex = 0, initialEntries = ['/'] } = {},
  TestComponent?: JSX.Element | JSX.Element[],
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      {TestComponent}
      <ToDoListProvider>
        <App />
      </ToDoListProvider>
    </MemoryRouter>,
  );
};
