import { connect } from 'umi';
import Breadcrumbs from '@/components/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { Button } from 'antd';
import { history } from 'umi';
// import NoticeBoardTable from './NoticeBoardTable';
import EventTable from './EventTable';
// import { event } from '@/utils/endpoints/event';

function Event({ dispatch, loading, noticeBoardList, getEventDetail, currentUser }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [previewTitle, setPreviewTitle] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);
  console.log(getEventDetail, 'noticeBoardList');
  const getAllEvent = () => {
    dispatch({
      type: 'event/getEventDetail',
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
  console.log(getAllEvent, 'kkkk');

  // useEffect(() => {
  //   getAllEvent();
  // }, [startIndex, limit, viewSize, searchText, dispatch, currentPage]);
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (currentUser?._id) {
      getAllEvent();
    }
  }, [currentUser, startIndex, limit, viewSize, searchText, dispatch, currentPage]);

  console.log('noticeBoardList', getEventDetail);

  return (
    <div className="container mx-auto">
      <Page
        title="Events"
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
                history.push(`/event/new/add`);
              }}
            >
              Add Events
            </Button>
          </div>
        }
      >
        <div>
          <div className="bg-white rounded shadow mb-3 p-3">
            <EventTable
              tableData={getEventDetail?.data}
              totalD={noticeBoardList?.totalCount}
              currentPage={currentPage}
              limit={limit}
              setLimit={setLimit}
              setCurrent={setCurrent}
              current={current}
              startIndex={startIndex}
              viewSize={viewSize}
              getAllEvent={getAllEvent}
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
              getEvent={() => getAllEvent}
              // inventory={inventoryState}
            />
          </div>
        </div>
      </Page>
    </div>
  );
}
const mapStateToProps = ({ user, loading, event }) => ({
  // currentUser: user?.currentUser,
  // noticeBoardList: noticeBoard?.allNoticeBoardList,
  // loading: loading.effects['noticeBoard/getAllNoticeBoardList'],
  currentUser: user?.currentUser,

  // eventList: event?.eventList,
  getEventDetail: event?.getEventDetail,
  loading: loading.effects['event/getEventDetail'],
});
export default connect(mapStateToProps)(Event);
