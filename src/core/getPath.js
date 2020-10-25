import { baseUrl } from '~/config.js';
export default function(source, projectname){
	let modelsIndex = `${baseUrl}/sm1/assets/modelsIndex.json`;
	let models = `${baseUrl}/sm1/assets/models.json`;
	let imageUrl = `${baseUrl}/sm1/assets/models`;
	switch (`${source}-${projectname}`) {
		case 'models-md2':
			modelsIndex = `${baseUrl}/md2/modelsIndex.json`;
			models = `${baseUrl}/md2/index.json`;
			imageUrl = `${baseUrl}/md2`;
			break;
		case `models-${projectname}`:
			modelsIndex = `${baseUrl}/${projectname}/modelsIndex.json`;
			models = `${baseUrl}/${projectname}/index.json`;
			imageUrl = `${baseUrl}/${projectname}`;
			break;
		default:
			break;
	}
	return {
		modelsIndex,
		models,
		imageUrl
	};
}
