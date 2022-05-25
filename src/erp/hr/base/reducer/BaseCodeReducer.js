import { createAction } from "redux-actions";

export const SEARCH_CODE = "src/erp/hr/Saga/Saga/SEARCH_CODE";
export const SEARCH_COMPANY_CODE ="src/erp/hr/Saga/Saga/SEARCH_COMPANY_CODE";
export const SEARCH_WORKPLACE_CODE = "src/erp/hr/Saga/Saga/SEARCH_WORKPLACE_CODE";

export const searchCode = createAction(SEARCH_CODE);
export const searchCompanyCode = createAction(SEARCH_COMPANY_CODE);
export const searchWorkplaceCode = createAction(SEARCH_WORKPLACE_CODE);

const initialState = {
  company: [],
  workplace:[],
  errorCode: "",
  errorMsg:"",
};

const basecode = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SEARCH_COMPANY_CODE:
      console.log("searchCode : action이름 -> action 이름이 등록된 BaseCodeReducer.js가 실행");
      console.log("function* basecode() BaseCodeSaga에서 generate 함수 실행될 것");
      return {
        ...state,
        company: action.payload,
      };

    case SEARCH_WORKPLACE_CODE:
      return {
        ...state,
        workplace: action.payload,
      };

    default:
      return state;
    }
}

export default basecode;