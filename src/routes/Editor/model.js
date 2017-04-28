import { delay } from 'redux-saga'
export default ()=>{
	return {
		state: '',
	reducers: {
		setText(state,action){
			return action.payload
		}
	}
	,effects: {
		*asyncsetText({ payload },{ call,put }){
			debugger
			yield call(delay, 1000)
			yield put({type:'setText',payload: payload })
		}
	}

	}
}
