import Page from '@/components/Page';

import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import Breadcrumbs from '@/components/BreadCrumbs';
import { Button, DatePicker, Drawer, message, Select, Spin, Tabs } from 'antd';
import TaxTable from './TaxTable';

function TaxPaid({ dispatch, getPaidtax }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const getTaxData = () => {
    dispatch({
      type: 'reports/getPaidTaxDetails',
      payload: {},
    });
  };

  useEffect(() => {
    getTaxData();
  }, [dispatch]);
  const { TabPane } = Tabs;

  return (
    <div className="container mx-auto">
      <Page
        title="Paid Tax History"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Reports',
                path: '/reports/all',
              },
              {
                name: 'Tax Paid',
                path: '/reports/taxpaid',
              },
            ]}
          />
        }
      >
        <div>
          <div className="bg-white rounded shadow mb-3 p-3">
            <Tabs>
              <TabPane key="ALL">
                <TaxTable
                  tableData={getPaidtax?.taxReport}
                  totalD={getPaidtax?.totalCount}
                  currentPage={currentPage}
                  setCurrent={setCurrent}
                  current={current}
                  startIndex={startIndex}
                  viewSize={viewSize}
                  setCurrentPage={setCurrentPage}
                  setStartIndex={setStartIndex}
                  setViewSize={setViewSize}
                  // setSearchText={setSearchText}
                  // searchText={searchText}
                  // loading={loading}
                  // setPreviewVisible={setPreviewVisible}
                  // setPreviewTitle={setPreviewTitle}
                  // previewTitle={previewTitle}
                  // setPreviewImage={setPreviewImage}
                  // previewImage={previewImage}
                  // getProductsList={() => getProductsList()}
                  // previewVisible={previewVisible}
                  // inventory={inventoryState}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Page>
    </div>
  );
}

const mapStateToProps = ({ user, reports, loading }) => ({
  currentUser: user?.currentUser,
  getPaidtax: reports?.getPaidtax,
  loading: loading.effects['reports/getPaidTaxDetails'],
});
export default connect(mapStateToProps)(TaxPaid);
