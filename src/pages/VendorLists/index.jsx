import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import VendorTable from './VendorTable';
import styles from './styles.less';

const VendorLists = () => {
  return (
    <div className="bg-white px-5">
      <Page
        title="Leads Scanner List"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Leads Scanner List',
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
            <VendorTable />
          </div>
        </div>
      </Page>
    </div>
  );
};

export default VendorLists;
