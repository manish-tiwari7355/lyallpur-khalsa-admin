import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';
import { connect } from 'umi';
import ContactTable from './ContactTable';

const Contact = ({ dispatch, contactList }) => {
  const [searchText, setSearchText] = useState('');
  const [startIndex, setStartIndex] = useState(0);

  console.log('contactList', contactList);

  useEffect(() => {
    dispatch({
      type: 'contact/getContactList',
      payload: {
        query: {
          startIndex,
          keyword: searchText,
          status: true,
        },
      },
    });
  }, [searchText, startIndex]);

  return (
    <div className="container mx-auto">
      <Page
        title="Contact"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Contact',
                path: '#',
              },
            ]}
          />
        }
      >
        <div>
          <div className="bg-white rounded shadow mb-3 p-3">
            <ContactTable
              tableData={contactList?.data}
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

export default connect(({ contact }) => ({ contactList: contact?.contactList }))(Contact);
