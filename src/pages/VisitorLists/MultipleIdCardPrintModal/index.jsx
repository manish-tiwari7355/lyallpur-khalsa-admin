import { useRef } from 'react';
import AppModal from '@/components/AppModal';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'antd';
import logo from '@/assets/logo/ATS-LOGO.png';
import { useLocation } from 'umi';
import { useSelector, useDispatch } from 'react-redux';
import './styles.less';

const MultipleIdCardPrintModal = ({ selectedRows, qrDataArr }) => {
  const {
    query: { id },
  } = useLocation();

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const { isVisibleMutlipleModal } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const getFormattedAddress = (address) => {
    let addr = '';
    addr += address?.address_line_1 ? `${address?.address_line_1},` : '';
    addr += address?.address_line_2 ? `${address?.address_line_2},` : '';
    addr += address?.city ? `${address?.city},` : '';
    addr += address?.state_code ? `${address?.state_code},` : '';
    addr += address?.postal_code ? `${address?.postal_code},` : '';
    addr += address?.country_code ? `${address?.country_code}` : '';
    return addr;
  };

  return (
    <AppModal
      showModal={isVisibleMutlipleModal}
      setShowModal={() =>
        dispatch({
          type: 'event/setIsVisibleMultiple',
          payload: {
            value: false,
          },
        })
      }
      footer={
        // <ReactToPrint
        //   pageStyle={pageStyle}
        //   trigger={() => <Button type="primary">Print</Button>}
        //   content={() => forwardRef.current}
        // />
        <Button type="primary" onClick={handlePrint}>
          Prints
        </Button>
      }
      width={600}
      bodyStyle={{ height: 700 }}
    >
      <div ref={printRef}>
        <div>
          {selectedRows?.map((row, i) => (
            <div key={i}>
              <div className="page-break" />
              <div
                className="shadow rounded"
                style={{
                  border: '1px solid #ccc',
                  width: '400px',
                  margin: '6px auto',
                }}
                // ref={selectedRecordPreview?._id === id ? forwardRef : null}
              >
                {/* card header */}
                <div className="m-4">
                  <header
                    className="flex justify-between p-2 shadow bg-blue-100 rounded-lg"
                    // style={{ border: '1px solid #ccc' }}
                  >
                    <div
                      className="flex "
                      style={{ width: '60%', borderRight: '2px solid rgb(42 67 101 / 15%)' }}
                    >
                      <img
                        src={logo}
                        className="h-24 w-24   mr-1"
                        style={{ border: '2px solid #1E3A8A' }}
                      />
                      <div>
                        <span className=" text-blue-800 font-semibold">AMERICAN TRUCKING</span>
                        <div className="font-bold text-blue-800 ">COMMERCIAL VEHICLE SHOW</div>
                      </div>
                    </div>
                    {/* <Divider style={{ 'background-color': 'black' }} type="vertical" /> */}

                    <div className="w-full ml-1 " style={{ width: '40%' }}>
                      <h4 className="text-blue-800 ">OCTOBER 28-31,2022</h4>
                      <span className="w-full text-xs break-words font-semibold">
                        GEORGIA WORLD COMGRESS CENTER ATLANTA,GEORGIA
                      </span>
                    </div>
                  </header>
                  <main className="text-center my-10">
                    <h1 className="capitalize text-4xl">{row?.name} </h1>
                    <address className="text-lg font-semibold">
                      {getFormattedAddress(row?.address)}
                    </address>
                    <div>
                      <img
                        style={{ height: '10rem', width: '10rem' }}
                        src={qrDataArr?.find((qr) => qr?.id === row?._id)?.url}
                        alt="qr-code"
                      />
                    </div>
                    <h1 className="mt-2 bg-blue-900 text-white font-bold capitalize">
                      {row?.type}
                    </h1>
                  </main>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppModal>
  );
};

export default MultipleIdCardPrintModal;
