import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// 루트 컴포넌트가 RecoilRoot 를 넣기에 가장 좋은 장소.
// Atom 은 상태(state) 의 일부를 나타낸다.
// Atoms 는 어떤 컴포넌트에서나 읽고 쓸 수 있다.
// atom 의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.
