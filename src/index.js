import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import Themes from 'util/StyleComponents/themes/index';
import { ThemeSwitcherProvider } from 'mui-theme-switcher';

//리덕스, 사가
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; //app에 store를 쉽게 연동시킬수 있게 도와주는 component
import createSagaMiddleware from 'redux-saga'; //react,redux application의 side effect(부수 효과)를 향상시켜주는 lib
/* eslint-disable-next-line */
import { composeWithDevTools } from 'redux-devtools-extension'; //redux store를 컨트롤 할 수 있는 확장 프로그램
import RootReducers from 'root/RootReducer';
import RootSaga from 'root/RootSaga';
//컴포넌트
import AppContainer from 'AppContainer';
import Dashboard from 'common/page/dashboard/Dashboard';

const sagaMiddleware = createSagaMiddleware();
//Reducer들을 store안에 넣어서 서로 연결시키고 그 store를 만들어주는 역할을 하는 것이 createStore
//Redux에 사용되는 모든 공통 Reducer들을 미리 생성
console.log("import 된 RootReducers 사용");
const store = createStore(RootReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

//Redux에 사용될 middleware를 미리 생성
console.log("RootSagaMiddleware를 실행");
sagaMiddleware.run(RootSaga);

const render = () => {
    console.log("index.js 실행");
    const state = store.getState(); //store안의 상태를 가져와 줌
    ReactDOM.render(
        <Provider store={store}>{/* REACT app에 store가 연동 됨 */}
            {state.dashReducer.startPrj === 'true' ? (
                <ThemeProvider theme={Themes.default}>
                    <ThemeSwitcherProvider
                        lightTheme={Themes.default}
                        darkTheme={Themes.darkTheme}
                        defaultTheme={'light'}>
                        <AppContainer />
                    </ThemeSwitcherProvider>
                </ThemeProvider>
            ) : (
                <Dashboard />
            )}
        </Provider>,
        document.getElementById('root')
    );
};
        
store.subscribe(render);
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();