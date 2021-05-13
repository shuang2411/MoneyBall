import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import {buyCard} from "@/services/ant-design-pro/api"

const FacilityDetailDrawer : React.FC = (props) => {
  const [visible, setVisible] = useState(false);
  const [facility, setFacility] = useState(props.Facility)
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
      $ {facility.cardsPrice}
      </Button>
      <Drawer
        title={facility.name}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>{facility.owner}</p>
        <p>{facility.ListingTime}</p>
        <p>{facility.cardsNum}</p>
        <p>{facility.cardsPrice}</p>

        {/*TODO::render the detailed information*/}
        <Button type="primary"
                    onClick = {async () => {
                        //TODO::Add a set state here to make component reactive to the changes
                        await buyCard(facility.docRef);
                        location = location;
                    }}
                    key='buy'>
                    Buy
                </Button>
      </Drawer>
    </>
  );
};

export default FacilityDetailDrawer