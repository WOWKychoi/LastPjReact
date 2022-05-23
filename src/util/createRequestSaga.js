import { call, put } from 'redux-saga/effects';
//put : 특정 action을 dispatch 시켜줌(인자에는 액션 객체가 들어감)
//call : 함수를 동기적으로 실행 시켜 줌(첫번째 인수는 함수, 두번째 인수는 해당 함수에 넣을 인수)
import { startLoading, finishLoading } from './loading';

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    console.log("두번째 *****************");
    //createRequestSaga(XXXX);
    console.log("index.js에서 RootSaga->BasicInfoSaga->createRequestSaga 호출");
    console.log("index.js에서 RootSaga->LogisticsInfoSaga->createRequestSaga 호출");
    return function*(action) {
        console.log('createRequestSaga: action');
        console.log(action);
        console.log("REQUEST:"+request);
        console.log(type);
        console.log('로딩 시작');
        yield put(startLoading(type)); //로딩 시작
        try {
            const response = yield call(request, action);//액션이 감지되었을때 상태값 처리를 위해 동작
            //request에 전달한 인자를 두번째 인자값으로 지정
            console.log('response');
            console.log(response);

            console.log('SUCCESS');
            console.log(SUCCESS);
            if (response)
                yield put({
                    type: SUCCESS,
                    payload: response.data
                });
            console.log('완료');
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true
            });
            console.log('실패');
            console.log(e);
        }
        yield put(finishLoading(type));
    };
}
