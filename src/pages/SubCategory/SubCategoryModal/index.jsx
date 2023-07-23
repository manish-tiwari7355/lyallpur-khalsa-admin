/* eslint-disable no-underscore-dangle */

import { Button, Input, Form, Modal, Row, Col, message, Select } from "antd";
import React, { useEffect, useState } from "react";

import { connect } from "umi";

const { Option } = Select;

function SubCategoryModal({
  isSubCatModalVisible,
  setIsSubCatModalVisible,
  dispatch,
  getCategoryList,
  isEdit,
  categoryList,
  setIsEdit,
  addCategoryLoading,
}) {
  const [form] = Form.useForm();

  const onFinish = () => {
    if (isEdit === "edit") {
      dispatch({
        type: "category/addCategory",
        payload: {
          body: {
            name: categoryList?.categoryData?.name,
            _id: categoryList?.categoryData?._id,
          },
        },
      })
        .then((res) => {
          if (res?.status === 500) {
            message.error(res?.data?.error?.message);
          } else if (res?.status === 200) {
            message.success("Sub Category added successfully");
            setIsSubCatModalVisible(false);
            form.resetFields();

            getCategoryList();
            setIsEdit(false);
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else {
      dispatch({
        type: "category/addCategory",
        payload: {
          body: {
            name: categoryList?.categoryData?.name,
            _id: categoryList?.categoryData?.id,
          },
        },
      })
        .then((res) => {
          if (res?.status === 500) {
            message.error(res?.data?.error?.message);
          } else if (res?.status === 200) {
            message.success("Category added successfully");
            setIsSubCatModalVisible(false);
            form.resetFields();

            getCategoryList();
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  };
  const [parentCategory, setParentCategory] = useState("");
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Modal
      title={isEdit === "edit" ? "Add Sub Category" : "Add Category"}
      onCancel={() => setIsSubCatModalVisible(false)}
      visible={isSubCatModalVisible}
      width={600}
      footer={
        <div className="flex justify-end gap-2">
          <div>
            <Button onClick={() => setIsSubCatModalVisible(false)}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              loading={addCategoryLoading}
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
              Add
            </Button>
          </div>
        </div>
      }
    >
      <div className="p-5">
        <Form
          onFinish={(val) => {
            onFinish(val);
          }}
          form={form}
          hideRequiredMark
        >
          <Row gutter={[12, 12]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
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
                  value={isEdit === "edit" ? parentCategory : ""}
                  onChange={(e) => {
                    setParentCategory(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className=" text-left mb-2">Parent Category</div>

              <Form.Item>
                <Select
                  defaultValue="select"
                  onChange={handleChange}
                  size="large"
                >
                  {categoryList?.categoryData?.map(({ _id, name }) => (
                    <Option value={name} key={_id} className="capitalize">
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {isEdit === "edit" && (
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <div className=" text-left mb-2">Parent category</div>
                <Form.Item name="parent">
                  <Input
                    size="large"
                    style={{ width: "100%" }}
                    disabled={true}
                    placeholder="Please select sub category"
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
}

const mapStateToProps = ({ user, loading, category }) => ({
  currentUser: user?.currentUser,
  categoryList: category?.categoryList,
  loading: loading.effects["category/getCategoryList"],
  addCategoryLoading:
    loading.effects["category/addCategory"] ||
    loading.effects["category/updateCategory"],
});
export default connect(mapStateToProps)(SubCategoryModal);
