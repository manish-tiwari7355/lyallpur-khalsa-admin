import Page from '@/components/Page';

import React, { useEffect, useState } from 'react';
import { connect, useHistory } from 'umi';
import { Button, Select, Tabs } from 'antd';
import Breadcrumbs from '@/components/BreadCrumbs';
import UserTable from './UserTable';

function Users({ dispatch, currentUser, getAllUsers, loading }) {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [getUsersMultipleData, setGetUsersMultipleData] = useState([]);
  const [tab, setTab] = useState('ALL');
  const history = useHistory();
  const getUsers = () => {
    dispatch({
      type: 'prospect/getAllUsers',
      payload: {
        query: {
          viewSize,
          startIndex,
          keyword: searchText,
          // status: tab === 'ALL' ? '' : tab,
          page: currentPage,
        },
      },
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (currentUser?._id) getUsers();
  }, [currentUser, searchText, tab, currentPage, viewSize, startIndex]);

  console.log(getUsersMultipleData, 'getUsersMultipleData');

  return (
    <div className="container mx-auto">
      <Page
        title="Users"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Users',
                path: '/users',
              },
            ]}
          />
        }
      >
        <div className="bg-white rounded shadow mb-3 p-3">
          <UserTable
            setGetUsersMultipleData={setGetUsersMultipleData}
            getUsersMultipleData={getUsersMultipleData}
            tableData={getAllUsers}
            currentPage={currentPage}
            startIndex={startIndex}
            viewSize={viewSize}
            tabName={tab}
            setCurrentPage={setCurrentPage}
            setStartIndex={setStartIndex}
            setViewSize={setViewSize}
            setSearchText={setSearchText}
            searchText={searchText}
            loading={loading}
          />
        </div>
      </Page>
    </div>
  );
}

const mapStateToProps = ({ user, prospect, loading }) => ({
  currentUser: user?.currentUser,
  getAllUsers: prospect?.getAllUsers,
  loading: loading.effects['prospect/getAllUsers'],
});
export default connect(mapStateToProps)(Users);
