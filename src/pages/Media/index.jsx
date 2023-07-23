import { connect } from 'umi';
import Breadcrumbs from '@/components/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { Button } from 'antd';
import { history } from 'umi';
// import NoticeBoardTable from './NoticeBoardTable';
import MediaTable from './MediaTable';

function Media({ dispatch, currentUser, loading, getMediaList, noticeBoardList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [previewTitle, setPreviewTitle] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);
  console.log('mediaList', getMediaList);
  const getAllMediaList = () => {
    dispatch({
      type: 'media/getMediaList',
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
      getAllMediaList();
    }
  }, [currentUser, startIndex, limit, viewSize, searchText, dispatch, currentPage]);

  console.log('noticeBoardList', noticeBoardList);

  return (
    <div className="container mx-auto">
      <Page
        title="Media"
        // breadcrumbs={
        //   <Breadcrumbs
        //     path={[
        //       {
        //         name: 'Dashboard',
        //         path: '/dashboard',
        //       },
        //       {
        //         name: 'NoticeBoard',
        //         path: '/noticeboard',
        //       },
        //     ]}
        //   />
        // }
        primaryAction={
          <div className="gap-3">
            <Button
              className="ml-3"
              size="middle"
              type="primary"
              onClick={() => {
                history.push(`/media/new/add`);
              }}
            >
              Add Media
            </Button>
          </div>
        }
      >
        <div>
          <div className="bg-white rounded shadow mb-3 p-3">
            <MediaTable
              tableData={getMediaList?.data}
              totalD={noticeBoardList?.totalCount}
              currentPage={currentPage}
              limit={limit}
              setLimit={setLimit}
              setCurrent={setCurrent}
              current={current}
              startIndex={startIndex}
              viewSize={viewSize}
              getAllMediaList={getAllMediaList}
              setCurrentPage={setCurrentPage}
              setStartIndex={setStartIndex}
              setViewSize={setViewSize}
              setSearchText={setSearchText}
              searchText={searchText}
              loading={loading}
              setPreviewVisible={setPreviewVisible}
              setPreviewTitle={setPreviewTitle}
              previewTitle={previewTitle}
              setPreviewImage={setPreviewImage}
              previewImage={previewImage}
              previewVisible={previewVisible}
              // inventory={inventoryState}
            />
          </div>
        </div>
      </Page>
    </div>
  );
}
const mapStateToProps = ({ user, media, loading }) => ({
  currentUser: user?.currentUser,
  getMediaList: media?.allMediaList,
  loading: loading.effects['media/getMediaList'],
});
export default connect(mapStateToProps)(Media);
