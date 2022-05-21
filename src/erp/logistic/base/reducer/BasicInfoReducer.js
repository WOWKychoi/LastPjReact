import * as types from 'erp/logistic/base/action/BasicInfoActionType';

const initialState = {
    workplaceList: [],
    ClientInfoList: [],
    FinanInfoList: [],
    DepartmentList: []
};
console.log("첫번째 *****************");
console.log('index.js에서 import 될 때 호출 됨  @@@ basicInfoReducer');
//4번 반복 됨 initialState에서 4개의 배열을 가져옴
function basicinfo(state = initialState, action) {
    console.log("ACTION"+JSON.stringify(action));
    console.log(action.type);
    switch (action.type) {
        case types.WORKPLACE_LIST:
            if (action.mode === 'add') {
                let newList = [...state.workplaceList, action.workplaceTo]; //[]
                return {
                    ...state,
                    workplaceList: newList
                };
            } else if (action.mode === 'delete') {
                let newList = action.newList; //[]
                return {
                    ...state,
                    workplaceList: newList
                };
            } else {
              
                return {
                    ...state
                };
            }

        /* falls through */
        case types.SEARCH_WORKPLACE_LIST:
           console.log("BasicInfo");
            return {
                ...state
            };
        case types.SEARCH_WORKPLACE_SUCCESS:
            return {
                ...state,
                workplaceList: action.payload.gridRowJson
            };
        case types.SEARCH_WORKPLACE_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };

        case types.SAVE_WORKPLACE:
            console.log("zzzz");
            return {
                ...state
            };

        case types.SAVE_WORKPLACE_SUCCESS:
            let result = state.workplaceList.filter(workplace => workplace.status !== 'DELETE');
            return {
                ...state,
                workplaceList: result
            };

        case types.SAVE_WORKPLACE_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };
        /* falls through */
        case types.SAVE_CLIENT_SUCCESS:
            let clientMsg = '저장되었습니다.';
            alert(clientMsg);

        /* falls through */
        case types.SAVE_CLIENT_FAILURE:
            return {
                ...state,
                error: action.err
            };

        case types.SAVE_FINANINFO_SUCCESS:
            const SuccessMsg = '저장되었습니다.';
            alert(SuccessMsg);

        /* falls through */
        case types.SAVE_FINANINFO_FAILURE:
            return {
                ...state,
                error: action.err
            };

        case types.SEARCH_CLIENTINFO_SUCCESS:
            return {
                ...state,
                ClientInfoList: action.payload.gridRowJson
            };

        case types.SEARCH_CLIENTINFO_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        case types.SEARCH_FINANINFO_SUCCESS:
            return {
                ...state,
                FinanInfoList: action.payload.gridRowJson
            };

        case types.SEARCH_FINANINFO_FAILURE:
            return {
                ...state,
                error: action.err
            };
        case types.SEARCH_DEPTINFO_SUCCESS:
            return {
                ...state,
                DepartmentList: action.payload.gridRowJson
            };
        case types.SEARCH_DEPTINFO_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case types.ADD_DEPTINFO:
            return {
                ...state,
                //DepartmentList: state.DepartmentList.concat(action.payload.newRow),
                DepartmentList: [...state.DepartmentList, action.payload.newRow]
            };
        case types.SAVE_DEPTINFO_SUCCESS:
            let deptInfoMsg = '저장되었습니다.';
            alert(deptInfoMsg);

        /* falls through */
        case types.SAVE_DEPTINFO_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

export default basicinfo;
