import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import LeadsTable from './LeadsTable';
import styles from '../VendorLists/styles.less';
import { useLocation } from 'umi';
const VendorLists = () => {
  const { pathname } = useLocation();
  return (
    <div className="bg-white px-5">
      <Page
        title={`${pathname === '/leads/my' ? 'My' : 'All'} Leads`}
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: `${pathname === '/leads/my' ? 'My' : 'All'} Leads`,
              },
            ]}
          />
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
            <LeadsTable />
          </div>
        </div>
      </Page>
    </div>
  );
};

export default VendorLists;
