/* eslint-disable no-underscore-dangle */
import EmptyStateContainer from "@/components/EmptyStateContainer";
import {
  Pagination,
  Table,
  Row,
  Input,
  Button,
  Modal,
  message,
  Popconfirm,
  Form,
  Col,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "umi";

import { debounce } from "lodash";

import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import AddCategoryModal from "../AddCategoryModal";

function CategoryTable(props) {
  const {
    currentPage,
    viewSize,
    tableData,
    dispatch,
    totalL,
    setCurrentPage,
    setStartIndex,
    setViewSize,
    setSearchText,
    loading,
    getCategoryList,
    updateLoading,
    previewImage,
    previewVisible,
    previewTitle,
    setPreviewVisible,
    setPreviewImage,
    setPreviewTitle,
    setIsEdit,
    isEdit,
  } = props;
  const [form] = Form.useForm();

  const [singleData, setSingleData] = useState(null);
  const [categoryAlreadyAddedState, setCategoryAlreadyAddedState] = useState(
    ""
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  const handleDelete = (val) => {
    dispatch({
      type: "category/deleteCategory",
      payload: {
        pathParams: { id: val },
      },
    })
      .then((res) => {
        if (res?.status === 200) {
          message.success("Category deleted successfully");
          setIsModalVisible(false);
          getCategoryList();
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  useEffect(() => {
    if (singleData?.name || updateCategoryModal) {
      form.setFieldsValue({
        name: singleData?.name,
        tax: `${singleData?.tax}%`,
      });
    }
  }, [singleData?.name, updateCategoryModal]);

  const RenderInformation = ({ record }) => (
    <div className="p-6  ">
      {record?.subCategory?.map((sub, index) => (
        <div
          key={sub?._id}
          className="flex p-2 divider justify-between  text-medium"
        >
          <div className="flex gap-2">
            {index + 1}. <div className="uppercase">{sub?.name}</div>
          </div>

          <div key="2" className="cursor-pointer">
            <Popconfirm
              title="Are you sure to remove this category?"
              onConfirm={() => {
                handleDelete(sub?._id);
              }}
              okText="Confirm"
              cancelText="No"
              okType="danger"
            >
              <Button
                type="link"
                danger
                size="small"
                style={{ padding: "0px 1px" }}
              >
                <DeleteOutlined style={{ color: "red" }} /> Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      ))}
    </div>
  );

  const categoryColumns = [
    {
      title: "S.No.",
      key: "Sr.No.",

      align: "left",
      datIndex: "",
      render: (_, __, index) => (
        <div> {index + 1 + viewSize * (currentPage - 1)}</div>
      ),
    },
    {
      title: "Name",
      key: "Name",
      align: "left",

      datIndex: "",
      render: (records) => <div className="uppercase"> {records?.name}</div>,
    },
    {
      title: "Action",
      key: "Action",
      align: "left",
      datIndex: "",
      render: (records) => (
        <div className="flex gap-4">
          <div
            key="1"
            className="cursor-pointer"
            onClick={() => {
              setIsModalVisible(true);
              setIsEdit("edit");
              setSingleData(records);
            }}
          >
            <EditOutlined /> Edit Sub Category
          </div>

          <AddCategoryModal
            isModalVisible={isModalVisible}
            setCategoryAlreadyAddedState={setCategoryAlreadyAddedState}
            categoryAlreadyAddedState={categoryAlreadyAddedState}
            setIsModalVisible={setIsModalVisible}
            setPreviewVisible={setPreviewVisible}
            setPreviewTitle={setPreviewTitle}
            previewTitle={previewTitle}
            setPreviewImage={setPreviewImage}
            previewImage={previewImage}
            getCategoryList={() => getCategoryList()}
            previewVisible={previewVisible}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            updateLoading={updateLoading}
            singleData={singleData}
            getCategotData={tableData?.categoryData}
          />
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
              style={{ width: 500, height: 500 }}
            />
          </Modal>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "Actions",
      align: "left",

      datIndex: "",
      render: (records) => (
        <div className="flex flex-row items-center">
          <div
            key="1"
            className="cursor-pointer"
            onClick={() => {
              setUpdateCategoryModal(true);

              setSingleData(records);
            }}
          >
            <EditOutlined /> Update
          </div>
          <div key="2" className="cursor-pointer ml-4">
            <Popconfirm
              title={
                <div>
                  <div style={{ fontSize: 12 }}>
                    Are you sure to remove this category?
                  </div>
                  <div className="" style={{ fontSize: 12, color: "red" }}>
                    * All product will be removed
                  </div>
                </div>
              }
              onConfirm={() => {
                handleDelete(records?._id);
              }}
              okText="Confirm"
              cancelText="No"
              okType="danger"
            >
              <Button
                type="link"
                danger
                size="small"
                style={{ padding: "0px 1px" }}
              >
                <DeleteOutlined style={{ color: "red" }} /> Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);
  return (
    <div>
      <Modal
        title="Update Category"
        onCancel={() => setUpdateCategoryModal(false)}
        visible={updateCategoryModal}
        width={600}
        footer={
          <div className="flex justify-end gap-2">
            <div>
              <Button onClick={() => setUpdateCategoryModal(false)}>
                Cancel
              </Button>
            </div>
            <div>
              <Button
                loading={updateLoading}
                type="primary"
                onClick={() => {
                  form
                    .validateFields()
                    .then(() => {
                      form.submit();
                    })
                    .catch(() => message?.error("Please fill all the details"));
                }}
              >
                Update
              </Button>
            </div>
          </div>
        }
      >
        <div className="p-5">
          <Form
            onFinish={(val) => {
              dispatch({
                type: "category/updateCategory",
                payload: {
                  pathParams: { id: singleData?._id },
                  body: {
                    // eslint-disable-next-line radix
                    // tax: Number(val.tax.replace(/%/g, '')),
                    name: val.newName,
                  },
                },
              }).then(() => {
                setUpdateCategoryModal(false);
                message?.success("Category updated successfully");
                getCategoryList();
              });
            }}
            form={form}
            hideRequiredMark
          >
            <Row gutter={[24, 24]}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <div className=" text-left mb-2">Name</div>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: `Please enter name!`,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter name"
                    disabled={true}
                  />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <div className=" text-left mb-2">New Name</div>
                <Form.Item name="newName">
                  <Input size="large" type="tel" placeholder="Enter New Name" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <div className="mb-2 flex">
        <Input
          size="large"
          onChange={(e) => debounceSearch(e.target.value)}
          placeholder="Enter name to search category "
          allowClear
        />
        <div>
          <Button className="w-full " type="primary" size="large">
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <Table
        loading={loading}
        pagination={false}
        columns={categoryColumns}
        rowKey={(record) => record?._id}
        dataSource={tableData?.categoryData}
        expandable={{
          expandedRowRender: (record) => <RenderInformation record={record} />,
          rowExpandable: (record) => record?.subCategory?.length > 0,
        }}
        footer={() => (
          <Row className="mt-2" type="flex" justify="end">
            <Pagination
              key={`page-${currentPage}`}
              showSizeChanger
              pageSizeOptions={["10", "25", "50", "100"]}
              onShowSizeChange={(e, p) => {
                setViewSize(p);
                setCurrentPage(1);
                setStartIndex(0);
              }}
              defaultCurrent={1}
              current={currentPage}
              pageSize={viewSize}
              total={totalL || 0}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              onChange={handleChangePagination}
            />
          </Row>
        )}
        locale={{
          emptyText: <EmptyStateContainer type={"category"} />,
        }}
      />
    </div>
  );
}

export default connect(null)(CategoryTable);
