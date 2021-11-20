
import {Upload, message, Button, Input} from 'antd'
import { UploadOutlined } from '@ant-design/icons';

function UploadInput({file, handleOnChange}){

	const zipTypes = ['application/zip','application/x-zip-compressed']

	const handleUpload = (info) => {
		if(info.file.status == 'removed') {
			handleOnChange({},'file')
			message.success(`${info.file.name} supprimé`);
		}else{
			if (zipTypes.indexOf(info.file.type) == -1) {
				message.error(`${info.file.name} n'est pas un fichier zip`);
				info.file.status = 'error'
			}else{
				if (info.file.status !== 'uploading') {
					handleOnChange(info.file,'file')
					message.success(`${info.file.name} chargé avec succès`);
				}
			}
		}
		
	}

	const props = {
		name: 'file',
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		headers: {
			authorization: 'authorization-text',
		},
		maxCount:1,
		showUploadList:!!file && Object.keys(file).length,
		beforeUpload: () => false,
		onChange(info) {
			handleUpload(info)
		},
	};
	return(
	<>
		<Upload {...props}>
			<Button icon={<UploadOutlined />}>Soummettre le fichier</Button>
		</Upload>
	</>
	)

}

export default UploadInput