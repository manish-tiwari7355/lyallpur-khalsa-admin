/* eslint-disable no-underscore-dangle */
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { connect, useHistory, useParams } from 'umi';
import PNG from '@/assets/file-types/png_doc.svg';
import PDF from '@/assets/file-types/pdf_doc.svg';
import { DeleteOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons';
import moment from 'moment';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditorConfig from '@/config/appConfig';
import TextArea from 'antd/lib/input/TextArea';

// import CategoryDropdown from "./Category";
// import Attribute from "./addAttribute";
function NoticeBoard({ dispatch, loading }) {
  const [form] = Form.useForm();

  const [text, setText] = useState('');
  console.log(text, 'text');
  const { recordId } = useParams();
  const [previewTitle, setPreviewTitle] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  // const [date, setDate] = useState('');
  const history = useHistory();
  const [contents, setContents] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (recordId) {
      dispatch({
        type: 'noticeBoard/getSingleNoticeBoard',
        payload: {
          pathParams: { id: recordId },
        },
      }).then((res) => {
        form.setFieldsValue({
          ...res?.data,
          date: moment(res?.data?.date),
        });
        setText(res?.data?.description);
        if (res?.data?.media?.[0]?.url !== undefined) {
          setContents([{ url: res?.data?.media?.[0]?.url }]);
        }
      });
    }
  }, [recordId]);
  const [firstImageUpload, setFirstImageUpload] = useState(false);
  const handleChange = (info) => {
    setFirstImageUpload(true);
    setContents(() => [info.file.originFileObj]);
  };

  const onFinish = (val) => {
    const formData = new FormData();
    formData.append('title', val.title);
    formData.append('date', val?.date);
    formData.append('description', val.description);
    contents.forEach((file) => {
      if (file?.uid) {
        formData.append('files', file);
      } else {
        formData.append('file', file?.url);
      }
    });
    console.log('formData', formData);
    if (recordId) {
      dispatch({
        type: 'noticeBoard/updateNoticeBoard',
        payload: {
          pathParams: { id: recordId },
          body: formData,
        },
      })
        .then((res) => {
          message.success('Notice Board updated successfully');
          history.push('/noticeboard');
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else {
      dispatch({
        type: 'noticeBoard/addNoticeBoard',
        payload: {
          body: formData,
        },
      })
        .then(() => {
          message.success('Notice Board added successfully');
          history.push('/noticeboard');
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  };

  const handlePreview = async (file_) => {
    const file = file_;
    setPreviewImage(file?._id ? file?.url : URL.createObjectURL(file));
    setPreviewVisible(true);
    setPreviewTitle(file?.name || file?.url.substring(file?.url.lastIndexOf('/') + 1));
  };
  // const onChange = (val) => {
  //   setDate(val);
  // };

  const handleChangeData = (e, editor) => {
    setData(editor?.getData());
  };
  return (
    <div className="container mx-auto">
      <Page title={recordId ? 'Edit Notice Board' : 'Add Notice Board'}>
        <div>
          <Form onFinish={onFinish} form={form} hideRequiredMark>
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24} className=" my-10">
                <Row>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="text-lg px-5 ">Basic Details</div>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="p-5 bg-white rounded-md">
                      <Row gutter={[12, 12]}>
                        <Col xl={12} lg={12} md={12} m={24} xs={24}>
                          <div className=" text-left  ">Title</div>
                          <Form.Item
                            name="title"
                            rules={[
                              {
                                required: true,

                                message: `Please enter name!`,
                              },
                            ]}
                          >
                            <Input size="large" placeholder="Enter name" />
                          </Form.Item>
                        </Col>
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
                        <Col xl={24} lg={24} md={24} sm={24} xs={24} className="-mt-5">
                          <div className=" text-left  ">Description</div>
                          <Form.Item name="description">
                            <TextArea size="large" value={text} pl aceholder="Enter Description" />
                            {/* <CKEditor
                              editor={ClassicEditor}
                              onChange={(e, editor) => {
                                handleChangeData(e, editor);
                              }}
                              data={data}
                              config={
                                CKEditorConfig.editor &&
                                CKEditorConfig.editor.toolbarType &&
                                CKEditorConfig.editor.toolbarType.email
                              }
                            /> */}
                          </Form.Item>
                        </Col>
                      </Row>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div className=" text-left ">Upload Images</div>
                        <Form.Item name="media">
                          <Upload.Dragger
                            multiple={true}
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
                                          (v) => v?.uid !== val?.uid || v?._id !== val?._id,
                                        );
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

                      <div className="w-full flex justify-end items-end">
                        <Button type="primary" htmlType="submit" loading={loading}>
                          {recordId ? 'Update' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Divider />
            </Row>
          </Form>
        </div>
      </Page>
    </div>
  );
}

const mapStateToProps = ({ user, loading }) => ({
  currentUser: user?.currentUser,
  loading:
    loading.effects['noticeBoard/addNoticeBoard'] ||
    loading.effects['noticeBoard/updateNoticeBoard'],
});
export default connect(mapStateToProps)(NoticeBoard);
