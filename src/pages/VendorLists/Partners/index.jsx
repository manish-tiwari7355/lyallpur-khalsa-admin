import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { useEffect, useState } from 'react';
import PartnersTable from './PartnersTable';
import styles from './styles.less';
import { Button, notification } from 'antd';
import { connect, useParams } from 'umi';
import AddPartner from './AddPartner';

const Partners = ({ loading, partners, dispatch, currentUser }) => {
  const [showAddPartner, setShowAddPartner] = useState(false);
  // const [limit, setLimit] = useState(10);
  // const [current, setCurrent] = useState(1);
  // const [searchKeyword, setSearchKeyword] = useState('');
  const { id } = useParams();
  const getPartners = () => {
    dispatch({
      type: 'event/getVendors',
      payload: {
        query: {
          // keyword: searchKeyword,
          // eslint-disable-next-line no-underscore-dangle
          invitedBy: currentUser?.role === 'vendor' ? currentUser?._id : id,
        },
      },
    }).catch(() => {
      notification.error({
        message: 'Not able to fetch vendors',
      });
    });
  };
  useEffect(() => {
    getPartners();
  }, [dispatch, id]);

  // const action = (value) => {
  //   setSearchKeyword(value);
  // };
  return (
    <div className="bg-white px-5">
      <Page
        title="Partners"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              currentUser?.role !== 'vendor'
                ? {
                  name: 'Vendors',
                  path: '/vendors',
                }
                : '',
              {
                name: 'Partners',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setShowAddPartner(true);
            }}
            className="mr-6"
          >
            Add partners
          </Button>
        }
        expanded
      >
        <div
          className={` ${styles.backgroundCover} `}
          style={{
            minHeight: '70vh',
          }}
        >
          <div className={`w-full  shadow ${styles.tableWrapper}`}>
            <PartnersTable data={partners} loading={loading} />
          </div>
        </div>
      </Page>
      <AddPartner
        showAddPartner={showAddPartner}
        setShowAddPartner={setShowAddPartner}
        getPartners={getPartners}
      />
    </div>
  );
};

export default connect(({ loading, event, user }) => ({
  loading: loading.effects['event/getVendors'],
  partners: event.vendors,
  currentUser: user.currentUser,
}))(Partners);
// export default connect(({ loading, event, user }) => ({}))(PartnersTable);
