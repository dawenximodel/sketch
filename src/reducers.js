import { set } from './config';
const {pagesize, time} = set;
const defaultState = {
	modelsIndex: [], // 模特索引数据（1）
	sourceList: [], // 模特数据（2）
	selected: [], // 当前所选择模特数据 （3）
	currentList: [], // 当前显示模特数据（4）
	pagesize, // 列表页每页显示
	page: 1, // 当前页面
	time,
	initDate: false,
	isX: false,
	isY: false,
	isMale: false,
	isFemale: false,
	showMenu: false,
	listHeight: 0,
	rootPath: '',
	source: null,
	projectname: null,
	requestPath: {}
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_RUNTIME_VARIABLE':
			return { ...defaultState, ...state, ...action.payload };
		default:
			return {...state, ...defaultState};
	}
};

export default reducer;