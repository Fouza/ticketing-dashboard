
import { Modal, Button, Input } from "antd"
import UploadInput from '../Upload/UploadInput'


function Terminer({ticket, handleOnChange, file, notes, isTerminerModalVisible, handleTerminerOk, handleCancel}){

	const { TextArea } = Input;
	return (
		<Modal title={`Terminer le Ticket numéro ${ticket.id}`} visible={isTerminerModalVisible}
				onCancel={handleCancel} 
				footer={[
					<Button key="back" onClick={handleCancel}>
						Return
					</Button>,
					<Button
							type="primary"
							onClick={handleTerminerOk} >
						Ok
					</Button>
				]}>
			<div className="flex fdr f1 marv20">
				<TextArea size="large" rows={2} placeholder="Remarque *" name="notes" value={notes}
						onChange={e => handleOnChange(e.currentTarget.value,'notes')} />
			</div>
			<UploadInput file={file} handleOnChange={handleOnChange} />
		</Modal>
	)
}

export default Terminer