/* eslint-disable no-underscore-dangle */
import CategoryTable from "./CategoryTable";
import { connect } from "umi";
import Breadcrumbs from "@/components/BreadCrumbs";
import React, { useEffect, useState } from "react";
import Page from "@/components/Page";
import { Button, Tabs } from "antd";
import AddCategoryModal from "./AddCategoryModal";
import SubCategoryModal from "./SubCategoryModal";

function Category({ dispatch, loading, currentUser, categoryList }) {
  const { TabPane } = Tabs;
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [tab, setTab] = useState("All");
  const [inventoryState, setInventoryState] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubCatModalVisible, setIsSubCatModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState("");
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);
  const getCategoryList = () => {
    dispatch({
      type: "category/getCategoryList",
      payload: {
        query: {
          viewSize,
          startIndex,
          keyword: searchText,
        },
      },
    });
  };
  console.log(categoryList, "my category");
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (currentUser?._id) getCategoryList();
  }, [
    currentUser,
    startIndex,
    limit,
    viewSize,
    tab,
    searchText,
    dispatch,
    currentPage,
  ]);

  return (
    <div className="container mx-auto">
      <Page
        title="Category"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: "Dashboard",
                path: "/dashboard",
              },
              {
                name: "Category",
                path: "/category",
              },
            ]}
          />
        }
        primaryAction={
          <div className="flex gap-4">
            <Button
              size="middle"
              type="primary"
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              Add Category
            </Button>

            <Button
              size="middle"
              type="primary"
              onClick={() => {
                setIsSubCatModalVisible(true);
              }}
            >
              Add Sub Category
            </Button>
          </div>
        }
      >
        <div>
          <div className="bg-white rounded shadow mb-3 p-3">
            {categoryList?.categoryData && (
              <Tabs
                defaultActiveKey={categoryList?.categoryData?.[0]?._id}
                //  activeKey={tab || categoryList?.categoryData?.[0]?._id}
                onTabClick={(val) => {
                  setTab(val);
                  setSearchText("");
                  setViewSize(10);
                  setStartIndex(0);
                  setCurrentPage(1);
                }}
              >
                {categoryList?.categoryData?.map(({ _id, name }) => {
                  return (
                    <TabPane
                      key={_id}
                      tab={
                        <div
                          className="px-4"
                          onClick={() => {
                            setInventoryState(false);
                          }}
                        >
                          {name}
                        </div>
                      }
                    >
                      <CategoryTable
                        tab={tab}
                        tableData={categoryList}
                        totalL={categoryList?.totalCount}
                        limit={limit}
                        setLimit={setLimit}
                        setCurrent={setCurrent}
                        current={current}
                        currentPage={currentPage}
                        startIndex={startIndex}
                        setIsEdit={setIsEdit}
                        isEdit={isEdit}
                        viewSize={viewSize}
                        setCurrentPage={setCurrentPage}
                        setStartIndex={setStartIndex}
                        setViewSize={setViewSize}
                        setSearchText={setSearchText}
                        searchText={searchText}
                        loading={loading}
                        getCategoryList={() => getCategoryList()}
                        inventory={inventoryState}
                      />
                    </TabPane>
                  );
                })}
              </Tabs>
            )}
          </div>
        </div>

        <AddCategoryModal
          categoryDataList={categoryList?.categoryData}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          getCategoryList={() => getCategoryList()}
        />

        <SubCategoryModal
          isSubCatModalVisible={isSubCatModalVisible}
          setIsSubCatModalVisible={setIsSubCatModalVisible}
        />
      </Page>
    </div>
  );
}
const mapStateToProps = ({ user, category, loading }) => ({
  currentUser: user?.currentUser,
  categoryList: category?.categoryList,
  loading: loading.effects["category/getCategoryList"],
});
export default connect(mapStateToProps)(Category);
