/* eslint-disable-next-line */
import React, { useEffect } from 'react';
import App from './App';
// redux
import { connect } from 'react-redux';
// saga
import { menuListRequest } from 'common/reducer/commonReducer';
import { reLoginSuccess } from 'common/reducer/commonReducer';

const AppContainer = props => { //props = {}
    console.log("index.js에서 AppContainer를 호출");
    const { isAuthenticated, menuListRequest, reLoginSuccess, authorityCode } = props;
    //authorityRequest();
    const UserInfo = async () => {
        const loggedInfo = sessionStorage.getItem('id_token'); //로그인 정보를 세션에서 가져옵니다.
        if (!loggedInfo) return; //로그인 정보가 없다면 여기서 멈춥니다.
        try {
            await reLoginSuccess();
        } catch (e) {
            sessionStorage.clear();
            window.location.href = '/';
        }
    };

    console.log(authorityCode);

    useEffect(() => {
        UserInfo();
        if (authorityCode !== undefined) menuListRequest({ authorityCode: authorityCode });
    }, [authorityCode]);

    return <App isAuthenticated={isAuthenticated} />;
};

const mapStateToProps = state => { //state를 props화
    return {
        isAuthenticated: state.logInOutReducer.isAuthenticated, //store안의 data를 props로 등록
        authorityCode: state.logInOutReducer.empInfo.authorityCode
    };
};

export default connect(mapStateToProps, { menuListRequest, reLoginSuccess })(AppContainer);
