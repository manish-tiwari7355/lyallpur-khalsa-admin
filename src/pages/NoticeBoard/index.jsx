import { connect } from 'umi';
import Breadcrumbs from '@/components/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { Button } from 'antd';
import { history } from 'umi';
import NoticeBoardTable from './NoticeBoardTable';

function NoticeBoard({ dispatch, loading, noticeBoardList, currentUser }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [previewTitle, setPreviewTitle] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);

  console.log('noticeBoardList', noticeBoardList);

  const getAllNoticeBoardList = () => {
    dispatch({
      type: 'noticeBoard/getAllNoticeBoardList',
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

  // useEffect(() => {
  //   getAllNoticeBoardList();
  // }, []);
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (currentUser?._id) {
      getAllNoticeBoardList();
    }
  }, [currentUser, startIndex, limit, viewSize, searchText, dispatch, currentPage]);
  console.log('noticeBoardList', noticeBoardList);

  return (
    <div className="container mx-auto">
      <Page
        title="Notice Board"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'NoticeBoard',
                path: '/noticeboard',
              },
            ]}
          />
        }
        primaryAction={
          <div className="gap-3">
            <Button
              className="ml-3"
              size="middle"
              type="primary"
              onClick={() => {
                history.push(`/noticeboard/add`);
              }}
            >
              Add Notice Board
            </Button>
          </div>
        }
      >
        <div>
          <div className="bg-white rounded shadow mb-3 p-3">
            <NoticeBoardTable
              tableData={noticeBoardList?.data}
              totalD={noticeBoardList?.totalCount}
              currentPage={currentPage}
              limit={limit}
              setLimit={setLimit}
              setCurrent={setCurrent}
              current={current}
              startIndex={startIndex}
              viewSize={viewSize}
              getAllNoticeBoardList={getAllNoticeBoardList}
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
              getNoticeList={() => getAllNoticeBoardList}
              // inventory={inventoryState}
            />
          </div>
        </div>
      </Page>
    </div>
  );
}
const mapStateToProps = ({ user, noticeBoard, loading }) => ({
  currentUser: user?.currentUser,
  noticeBoardList: noticeBoard?.allNoticeBoardList,
  loading: loading.effects['noticeBoard/getAllNoticeBoardList'],
});
export default connect(mapStateToProps)(NoticeBoard);
