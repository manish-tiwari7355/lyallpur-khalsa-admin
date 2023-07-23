/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import VisitorTable from './VisitorTable';
import styles from './styles.less';
import { Button, notification } from 'antd';
import { useHistory, connect } from 'umi';
import PdfGeneratePreview from '@/components/PdfGeneratePreview';

const RegisteredList = ({ dispatch, pdfGenerateLoading }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const history = useHistory();

  const getIdCardDocPdf = () => {
    dispatch({
      type: 'event/showGeneratePdf',
      payload: {
        body: {
          value: true,
        },
      },
    });
    dispatch({
      type: 'event/getIdCardPdfDoc',
      payload: {
        body: { records: selectedRows?.map((row) => row._id) },
      },
    })
      .then((res) => {
        setTimeout(() => {
          setPdfUrl(res?.url);
        }, 2000);
        setUpdatedRows(selectedRows)
        // setTimeout(() => {
        /**
         * @CAUTION: Dont't delete this below code @AmitMathur
         */
        // const a = document.createElement('a');
        // a.setAttribute('href', res?.url);
        // a.setAttribute('target', '_blank');
        // a.click();
        // */
      })
      .catch((err) => {
        notification.error({
          message: 'Not able to generate PDF',
          description: err?.data?.message,
        });
      });
  };

  return (
    <div className="bg-white px-5">
      <Page
        title="Visitors"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Visitors',
              },
            ]}
          />
        }
        primaryAction={
          <div className="flex ">
            <Button
              type="primary"
              size="large"
              onClick={() => {
                history.push('/register');
              }}
              className="mr-6"
            >
              Add visitors
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                getIdCardDocPdf();
              }}
              disabled={!selectedRows?.length > 0}
            >
              Print
            </Button>
          </div>
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
            <VisitorTable updatedRows={updatedRows} setSelectedRows={setSelectedRows} />
          </div>
        </div>
      </Page>
      <PdfGeneratePreview
        pdfGenerateLoading={pdfGenerateLoading}
        pdfUrl={pdfUrl}
        setPdfUrl={setPdfUrl}
      />
    </div>
  );
};

export default connect(({ loading: { effects } }) => ({
  pdfGenerateLoading: effects['event/getIdCardPdfDoc'],
}))(RegisteredList);
