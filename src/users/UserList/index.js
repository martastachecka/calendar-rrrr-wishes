import React from 'react';
import { Table } from 'reactable';

const UserList = ({ users }) => (
	<div className="user-list">
		<Table
			className="table"
			data={users}
			filterable={['name']}
			sortable={['name']}
		/>
	</div>
);

export default UserList;