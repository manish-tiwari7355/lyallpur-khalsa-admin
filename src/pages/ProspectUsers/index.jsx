import Page from '@/components/Page';

import React, { useEffect, useState } from 'react';
import UsersTable from './UsersTable';
import { connect } from 'umi';
import { Tabs } from 'antd';
import Breadcrumbs from '@/components/BreadCrumbs';

function ProspectUsers({ dispatch, currentUser, prospectUsersList, loading }) {
  const { TabPane } = Tabs;
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [tab, setTab] = useState('ALL');

  const getProspectUsersList = () => {
    dispatch({
      type: 'prospect/getProspectUsersList',
      payload: {
        query: {
          viewSize,
          startIndex,
          keyword: searchText,
          status: tab === 'ALL' ? '' : tab,
          page: currentPage,
        },
      },
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (currentUser?._id) getProspectUsersList();
  }, [currentUser, searchText, tab, currentPage]);

  return (
    <div className="container mx-auto">
      <Page
        title="Customers"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Customers',
                path: '/prospectusers',
              },
            ]}
          />
        }
      >
        <div className="bg-white rounded shadow mb-3 p-3">
          <Tabs
            activeKey={tab}
            onTabClick={(val) => {
              setTab(val);
              setSearchText('');
              setViewSize(10);
              setStartIndex(0);
              setCurrentPage(1);
            }}
          >
            <TabPane tab={<span className="px-4">All</span>} key="ALL">
              <UsersTable
                tableData={prospectUsersList}
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
            </TabPane>
            <TabPane tab={<span className="px-4">Accepted</span>} key="ACCEPTED">
              <UsersTable
                tableData={prospectUsersList}
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
            </TabPane>

            <TabPane tab={<span className="px-4">Pending</span>} key="PENDING">
              <UsersTable
                tableData={prospectUsersList}
                currentPage={currentPage}
                startIndex={startIndex}
                viewSize={viewSize}
                tabName={tab}
                setCurrentPage={setCurrentPage}
                setStartIndex={setStartIndex}
                setViewSize={setViewSize}
                setSearchText={setSearchText}
                searchText={searchText}
                getProspectUsersList={() => {
                  getProspectUsersList();
                }}
                loading={loading}
              />
            </TabPane>

            <TabPane tab={<span className="px-4">Rejected</span>} key="REJECTED">
              <UsersTable
                tableData={prospectUsersList}
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
            </TabPane>
          </Tabs>
        </div>
      </Page>
    </div>
  );
}

const mapStateToProps = ({ user, prospect, loading }) => ({
  currentUser: user?.currentUser,
  prospectUsersList: prospect?.prospectUsersList,
  loading: loading.effects['prospect/getProspectUsersList'],
});
export default connect(mapStateToProps)(ProspectUsers);
