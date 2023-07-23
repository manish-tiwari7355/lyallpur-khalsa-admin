/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Col, Row, Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import { getInitials } from '@/utils/common';
import visitorIcon from '@/assets/icons/visitors.png';
import subsIcon from '@/assets/icons/subscription.png';
import exhibitorIcon from '@/assets/icons/exhibitor.png';
import vendorIcon from '@/assets/icons/vendors.png';

import { useDispatch, connect, useHistory } from 'umi';

const AnalyticsCards = ({ currentUser, stats }) => {
  // console.log(stats, 'stats')
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [exhibitorCount, setExhibitorCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [current, setCurrent] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  // const { vendors } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'event/getDashboardStats',
    }).then((res) => {
      setSubscriptionCount(res.subscriptionCount);
      setExhibitorCount(res.exhibitorCount);
      setVisitorCount(res.visitorCount);
    });
  }, []);
  const history = useHistory();
  const cards = [
    {
      name: 'Visitors',
      key: 'visitor',
      icon: visitorIcon,
      value: visitorCount,
      route: '/visitors',
    },
    {
      name: 'Exhibitor',
      key: 'exhibitor',
      icon: exhibitorIcon,
      value: exhibitorCount,
      route: '/exhibitors',
    },
    {
      name: 'Lead Scanners',
      key: 'subscription',
      icon: subsIcon,
      value: subscriptionCount,
      route: '/vendors',
    },
  ];
  return (
    <div className="">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold text-gray-700 mb-4">
          <Avatar
            size="large"
            className="bg-blue-800 w-8 uppercase"
            style={{
              backgroundColor: '#32727A',
            }}
          >
            <div className="text-lg">{getInitials(currentUser?.name)}</div>
          </Avatar>
          <span className="text-gray-900 ml-2"> Hi {currentUser?.name}, Welcome Back!</span>
        </div>
        {/* <div className="mt-1">
          <Link to="/service-user/create">
            <Button type="primary" size="medium">
              Create Service User <PlusSquareOutlined />
            </Button>
          </Link>
        </div> */}
      </div>
      <div className="mt-4">
        <Row gutter={[24, 24]} className="">
          {cards.map((card) => (
            <Col xl={8} lg={8} md={12} sm={24} xs={24} key={card?.key}>
              <button
                onClick={() => {
                  history.push(card.route);
                }}
                className="border-0  w-full cursor-pointer"
              >
                <div
                  className="shadow-xl rounded-lg bg-white py-4  px-4 flex items-center justify-between "
                  style={{ background: 'linear-gradient(135deg, #184e68 0%,#57ca85 100%)' }}
                >
                  <div className="">
                    <div className="text-lg text-white font-bold">{card.name}</div>
                    <div className="text-3xl font-bold">{card?.value || 0}</div>
                  </div>
                  <div className="">
                    <img src={card.icon} alt="icon" className="h-16 w-16 contain" />
                  </div>
                </div>
              </button>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default connect(({ user, event, order }) => ({
  currentUser: user.currentUser,
  stats: event.stats,
  orderList: order.orderList,
  vendors: event.vendors,
}))(AnalyticsCards);
