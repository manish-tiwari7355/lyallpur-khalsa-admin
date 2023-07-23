import AppModal from '@/components/AppModal';
import { useReactToPrint } from 'react-to-print';
import { Button } from 'antd';
import logo from '@/assets/logo/ATS-LOGO.png';
import { useLocation } from 'umi';

const PreviewCardModalToPrint = ({
  showPreviewCardModal,
  onClose,
  selectedRecordPreview,
  forwardRef,
  qrData,
}) => {
  const {
    query: { id },
  } = useLocation();
  const handlePrint = useReactToPrint({
    content: () => forwardRef.current,
  });

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
      showModal={showPreviewCardModal}
      setShowModal={onClose}
      footer={
        // <ReactToPrint
        //   pageStyle={pageStyle}
        //   trigger={() => <Button type="primary">Print</Button>}
        //   content={() => forwardRef.current}
        // />
        <Button type="primary" onClick={handlePrint}>
          Print
        </Button>
      }
    >
      <div
        className="shadow  rounded"
        style={{ border: '1px solid #ccc', width: '400px', margin: '6px auto' }}
        ref={selectedRecordPreview?._id === id ? forwardRef : null}
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
              <div className="text-blue-800 ">OCTOBER 28-31,2022</div>
              <span className="w-full text-xs break-words font-semibold">
                GEORGIA WORLD COMGRESS CENTER ATLANTA,GEORGIA
              </span>
            </div>
          </header>
          <main className="text-center my-10">
            <h1 className="capitalize text-4xl"> {selectedRecordPreview?.name}</h1>
            <address className="text-lg font-semibold">
              {getFormattedAddress(selectedRecordPreview?.address)}
            </address>
            <div>
              <img style={{ height: '10rem', width: '10rem' }} src={qrData} />
            </div>
            <h1 className="mt-2 bg-blue-900 text-white font-bold capitalize">
              {selectedRecordPreview?.type}
            </h1>
          </main>
        </div>
      </div>
    </AppModal>
  );
};

export default PreviewCardModalToPrint;
