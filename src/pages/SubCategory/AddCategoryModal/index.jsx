/* eslint-disable no-underscore-dangle */

import { category } from "@/utils/endpoints/category";
import { Button, Input, Form, Modal, Row, Col, message } from "antd";
import React, { useState } from "react";

import { connect } from "umi";

function AddCategoryModal({
  isModalVisible,
  setIsModalVisible,
  dispatch,
  getCategoryList,
  isEdit,
  setIsEdit,
  addCategoryLoading,
}) {
  const [form] = Form.useForm();
  const [categoryState, setCategoryState] = useState("");

  const onFinish = () => {
    if (isEdit === "edit") {
      dispatch({
        type: "category/addCategory",
        payload: {
          body: { name: categoryState },
        },
      })
        .then((res) => {
          if (res?.data?.error?.status === 500) {
            message.error(res?.data?.error?.message);
          }

          if (res?.status === 200) {
            message.success("Category edited successfully");
            setIsModalVisible(false);
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
          body: { name: categoryState },
        },
      })
        .then((res) => {
          if (res?.status === 500) {
            message.error(res?.data?.error?.message);
          } else if (res?.status === 200) {
            message.success("Category added successfully");
            setIsModalVisible(false);
            form.resetFields();

            getCategoryList();
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  };

  return (
    <Modal
      title={isEdit === "edit" ? "Add Sub Category" : "Add Category"}
      onCancel={() => setIsModalVisible(false)}
      visible={isModalVisible}
      width={600}
      footer={
        <div className="flex justify-end gap-2">
          <div>
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
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
          <Row gutter={[24, 24]}>
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
                  value={isEdit === "edit" ? categoryState : ""}
                  onChange={(e) => {
                    setCategoryState(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>

            {isEdit === "edit" && (
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <div className=" text-left mb-2">Parent category</div>
                <Form.Item name="parent">
                  <Input
                    size="large"
                    style={{ width: "100%" }}
                    disabled={false}
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

const mapStateToProps = ({ user, loading }) => ({
  currentUser: user?.currentUser,
  categoryList: category?.categoryList,
  loading: loading.effects["category/getCategoryList"],
  addCategoryLoading:
    loading.effects["category/addCategory"] ||
    loading.effects["category/updateCategory"],
});
export default connect(mapStateToProps)(AddCategoryModal);
