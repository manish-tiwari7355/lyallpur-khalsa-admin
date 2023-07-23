// import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';
import { connect } from 'umi';
import EnquiryTable from './EnquiryTable';
// import ContactTable from './ContactTable';

const EnquiryForm = ({ currentPage, currentUser, dispatch, enquiryList }) => {
  const [searchText, setSearchText] = useState('');
  console.log(searchText, 'searchText');
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  console.log('enquiryList', enquiryList);
  const [limit, setLimit] = useState(10);
  //   const [searchText, setSearchText] = useState('');
  //   const [startIndex, setStartIndex] = useState(0);

  //   console.log('contactList', contactList);
  const getAllEnquiryList = () => {
    dispatch({
      type: 'enquiryForm/getEnquiryList',
      payload: {
        query: {
          viewSize,
          startIndex,
          keyword: searchText,
          status: true,
        },
      },
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (currentUser?._id) {
      getAllEnquiryList();
    }
  }, [startIndex, limit, viewSize, searchText, currentPage, dispatch]);

  return (
    <div className="container mx-auto">
      <Page
        title="EnquiryForm"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Enquiry Form',
                path: '#',
              },
            ]}
          />
        }
      >
        <div>
          <div className="bg-white rounded shadow mb-3 p-3">
            <EnquiryTable
              tableData={enquiryList?.data}
              searchText={searchText}
              setSearchText={setSearchText}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
            />
          </div>
        </div>
      </Page>
    </div>
  );
};
const mapStateToProps = ({ user, enquiryForm, loading }) => ({
  currentUser: user.currentUser,
  enquiryList: enquiryForm.enquiryList,
  loading: loading.effects['enquiryForm/getEnquiryList'],
});
export default connect(mapStateToProps)(EnquiryForm);
