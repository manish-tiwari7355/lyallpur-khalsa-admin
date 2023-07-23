import { useState, useEffect } from 'react';
import {
  DatePicker,
  TimePicker,
  Form,
  Input,
  Image,
  Row,
  Col,
  Button,
  notification,
  Spin,
  Upload,
  Tooltip,
  message,
} from 'antd';
import dummyLogo from '@/assets/file-types/yourlogo.jpg';
import styles from './styles.less';
import { useSelector, useDispatch } from 'umi';
import { connect, useHistory, useParams } from 'umi';

import moment from 'moment';
import { DeleteOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons';
import PNG from '@/assets/file-types/png_doc.svg';
import PDF from '@/assets/file-types/pdf_doc.svg';
import Modal from 'antd/lib/modal/Modal';
const Event = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [contents, setContents] = useState([]);
  const { recordId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState();
  const [text, setText] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [eventLogoData, setEventLogoData] = useState('');
  const [sponserLogoData, setSponserLogoData] = useState('');
  const [firstImageUpload, setFirstImageUpload] = useState(false);
  // const [initialLogo, setInitialLogo] = useState('');
  const { eventDetail, updateLoading, getEventLoading } = useSelector((state) => ({
    eventDetail: state?.event?.eventDetail,
    updateLoading: state.loading.effects['event/updateEventDetails'],
    getEventLoading: state.loading.effects['event/getEventDetail'],
  }));
  console.log('contents', contents);
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (recordId) {
      dispatch({
        type: 'event/getSingleEventDetail',
        payload: {
          pathParams: { id: recordId },
        },
      }).then((res) => {
        form.setFieldsValue({
          ...res?.data,
          date: moment(res?.data?.date),
        });
        setText(res?.data?.description);
        // if (res?.data?.media?.[0]?.url !== undefined) {
        setContents(res?.data?.media);
        // }
      });
    }
  }, [recordId]);
  // const getEventDetail = () => {
  //   dispatch({
  //     type: 'event/getSingleEventDetails',
  //     payload: {
  //       pathParams: { id: recordId },
  //     },
  //   })
  //     .then((res) => {
  //       if (res?.message === 'success') {
  //         form?.setFieldsValue({
  //           eventName: res?.event?.eventName,
  //           event_date: moment(res?.event?.event_date),
  //           venue: res?.event?.venue,
  //           description: res?.event?.description,
  //           event_timing: [moment(res?.event?.start_time), moment(res?.event?.end_time)],
  //         });
  //         if (res?.event) {
  //           setShowEditButton(true);
  //           setIsDisabled(true);
  //         }
  //         setEventLogoData(res?.event?.event_logo || '');
  //         setSponserLogoData(res?.event?.sponser_logo || '');
  //       }
  //     })
  //     .catch((err) => {
  //       notification.error({
  //         message: 'Oops! Something went wrong.',
  //         description: err?.data?.message,
  //       });
  //     });
  // };
  const onFinish = (val) => {
    const formData = new FormData();
    formData.append('title', val.title);
    formData.append('description', val.description);

    formData.append('date', val?.date || '');

    contents.forEach((file, id) => {
      if (file?.uid) {
        formData.append(`files${id}`, file);
      } else {
        formData.append(`file${id}`, file?.url);
      }
      console.log('id', file, id);
    });
    if (recordId) {
      dispatch({
        type: 'event/updateEventDetail',
        payload: {
          pathParams: { id: recordId },
          body: formData,
        },
      })
        .then((res) => {
          message.success('Event updated successfully');
          history.push('/event/all');
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else {
      dispatch({
        type: 'event/addEventDetail',
        payload: {
          body: formData,
        },
      })
        .then(() => {
          message.success('Event added successfully');
          history.push('/event/all');
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  };
  const handlePreview = async (file_) => {
    const file = file_;
    // eslint-disable-next-line no-underscore-dangle
    setPreviewImage(file?._id ? file?.url : URL.createObjectURL(file));
    setPreviewVisible(true);
    setPreviewTitle(file?.name || file?.url.substring(file?.url.lastIndexOf('/') + 1));
  };
  const handleChange = (info) => {
    setFirstImageUpload(true);
    setContents((prev) => [...prev, info.file.originFileObj]);
  };
  // useEffect(() => {
  //   getEventDetail();
  // }, []);
  // useEffect(() => {
  //   if (recordId) {
  //     getEventDetail();
  //   }
  // });
  const uploadButton = (title) => (
    <div className="cursor-pointer">
      <div className="relative">
        <Tooltip title={title}>
          <img
            src={(title === 'Upload Event Logo' ? eventLogoData : sponserLogoData) || dummyLogo}
            className="h-32 w-32 rounded"
            alt="event_logo"
            style={{ border: '2px solid #15428261' }}
          />
        </Tooltip>
      </div>
    </div>
  );
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  return (
    <div className="bg-white h-full">
      <div className={`bg-white h-full w-full mb-8  `}>
        <div className={`${styles.form_container}`}>
          <div
            className={`bg-white rounded-lg ${styles.form_container_wrapper} h-full mt-10 w-full max-w-3xl`}
          >
            <div className="py-10">
              <Form
                colon="false"
                layout="vertical"
                form={form}
                scrollToFirstError
                autoComplete="off"
                requiredMark={false}
                onFinish={(values) => {
                  onFinish(values);
                }}
              >
                <div className="px-8">
                  <Row gutter={[12, 0]}>
                    <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="title"
                        label={<span className="formLabel ">Event Name</span>}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: `Event Name can't be blank!`,
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder={`Enter event name `}
                          disabled={isDisabled}
                        />
                      </Form.Item>
                    </Col>
                    {/* <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="event_date"
                        label={<span className="formLabel ">Date</span>}
                        rules={[
                          {
                            required: true,
                            // whitespace: true,
                            message: `event date can't be blank!`,
                          },
                        ]}
                      >
                        <DatePicker size="large" className="w-full" disabled={isDisabled} />
                      </Form.Item>
                    </Col> */}
                    {/* <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="event_timing"
                        label={<span className="formLabel ">Select time</span>}
                        rules={[
                          {
                            required: true,
                            // whitespace: true,
                            message: `event timing can't be blank!`,
                          },
                        ]}
                      >
                        <TimePicker.RangePicker
                          use12Hours
                          format="h:mm a"
                          className="w-full"
                          size="large"
                          disabled={isDisabled}
                        />
                      </Form.Item>
                    </Col> */}
                    {/* <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="venue"
                        label={<span className="formLabel ">Venue</span>}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: `Venue can't be blank!`,
                          },
                        ]}
                      >
                        <TextArea
                          size="large"
                          placeholder={`Enter venue address where event held.`}
                          disabled={isDisabled}
                        />
                      </Form.Item>
                    </Col> */}
                    <Col xl={12} lg={12} md={12} m={24} xs={24}>
                      <div className=" text-left  ">Date</div>
                      <Form.Item
                        name="date"
                        rules={[
                          {
                            required: true,
                            message: `Please enter date!`,
                          },
                        ]}
                      >
                        <DatePicker format={'YYYY-MM-DD'} size="large" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xl={12} md={24} sm={24} xs={24}>
                      <Form.Item
                        name="description"
                        label={<span className="formLabel ">Description</span>}
                        // rules={[
                        //   {
                        //     required: true,
                        //     whitespace: true,
                        //     message: `Description can't be blank!`,
                        //   },
                        // ]}
                      >
                        <TextArea
                          size="large"
                          placeholder={`Enter event description.`}
                          disabled={isDisabled}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <div className=" text-left ">Upload Images</div>
                      <Form.Item name="media">
                        <Upload.Dragger
                          multiple={true}
                          // maxCount={1}
                          accept="image/*,video/*,"
                          beforeUpload={(file) => {
                            const isJpgOrPng =
                              file.type === 'image/jpeg' ||
                              file.type === 'image/png' ||
                              file.type === 'video/mp4';
                            if (!isJpgOrPng) {
                              message.error('You can only upload JPG/PNG or mp4 file!');
                            }
                            const isLt2M = file.size / 1024 / 1024 < 2;
                            if (!isLt2M) {
                              message.error('Image must smaller than 2MB!');
                            }
                            return isJpgOrPng && isLt2M;
                          }}
                          onChange={handleChange}
                          fileList={[]}
                        >
                          <InboxOutlined className="text-2xl " style={{ color: 'green' }} />
                          <p className="ant-upload-text">
                            Click or drag file to this area to upload
                          </p>
                          <p className="text-gray-500">Please upload JPG,JPEG or PNG format.</p>
                        </Upload.Dragger>
                        <div className="w-full" style={{ maxHeight: '230px', overflowY: 'auto' }}>
                          {contents?.length > 0 &&
                            contents?.map((val) => (
                              <div
                                key={val?.url}
                                className="flex border rounded-md justify-between items-center p-1 my-3 "
                              >
                                <div className="flex">
                                  <div>
                                    <img
                                      src={val?.type?.includes('pdf') ? PDF : PNG}
                                      alt=""
                                      height={'26px'}
                                    />
                                  </div>
                                  <div>
                                    <span className="text-sm font-semibold ml-4">
                                      {val?.url
                                        ? val?.url?.substring(val?.url.lastIndexOf('/') + 1)
                                        : val?.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="gap-1 flex">
                                  <div className="cursor-pointer">
                                    {firstImageUpload ? (
                                      <Button
                                        type="link"
                                        onClick={() => {
                                          handlePreview(val);
                                        }}
                                      >
                                        <EyeOutlined style={{ fontSize: '16px' }} />
                                      </Button>
                                    ) : (
                                      <Image width={100} src={val?.url} preview={val?.url} />
                                    )}
                                  </div>
                                </div>
                                <div className="cursor-pointer">
                                  <Button
                                    danger
                                    type="link"
                                    onClick={() => {
                                      const files = contents?.filter(
                                        // eslint-disable-next-line no-underscore-dangle
                                        (v) => v?.uid !== val?.uid || v?._id !== val?._id,
                                      );
                                      console.log(files, files);
                                      setContents(files);
                                    }}
                                  >
                                    <DeleteOutlined style={{ fontSize: '16px' }} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                        <Modal
                          width="1200px"
                          title={previewTitle}
                          // bodyStyle={{ height: 800 }}
                          visible={previewVisible}
                          footer={null}
                          onCancel={() => setPreviewVisible(false)}
                        >
                          <iframe
                            title="iframe"
                            src={previewImage}
                            style={{ width: '100%', height: 700 }}
                          />
                        </Modal>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
            <div className="flex justify-end px-8">
              <Button
                loading={updateLoading}
                type="primary"
                disabled={isDisabled}
                onClick={() => form?.submit()}
                size="large"
              >
                {recordId ? 'Update Event' : 'Add Event'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ user, loading }) => ({
  currentUser: user?.currentUser,
  loading: loading.effects['event/AddEditEventForm'],
});

export default connect(mapStateToProps)(Event);
