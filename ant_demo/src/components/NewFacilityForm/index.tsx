import React, { useState } from "react";
import { Button, message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormCheckbox
} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import {createNewFacility,updateFacility} from "@/services/ant-design-pro/api"
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";

type DataSourceType = {
  id: React.Key;
  info?: string;
  category?: string;
  
};

const defaultData: DataSourceType[] = [
 
  
];

const NewFacilityForm = (props) => {
  
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData
  );

  const [facility, setFacility] = useState<API.NewFacility>(props.Facility);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Feature",
      dataIndex: "feature",
      width: "30%"
    },
    {
      title: "Information",
      dataIndex: "info",
      width: "60%"
    },
    {
      title: "Delete",
      width: 250,
      render: (text, record, _, action) => [
        <a
        key="Delete"
        onClick={() => {
          setDataSource(dataSource.filter((item) => item.id !== record.id));
        }}
      >
        Delete
      </a>
      ]
    }
  ];

  return (
    <ModalForm<API.NewFacility>
      title="Claim a new facility"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Claim a new facility
        </Button>
      }
      initialValues={{
        'name': facility === undefined? "": facility.name,
        'owner':facility === undefined? "": facility.owner,
        'listingTime':facility === undefined? "": facility.listingTime,
        'cardsNum': facility === undefined? "": facility.cardsNum,
        'cardsPrice':facility === undefined? "": facility.cardsPrice,
        "latitude":facility === undefined? "": facility.latitude,
        "longitude": facility === undefined? "": facility.longitude,
      }}
      modalProps={{
        onCancel: () => console.log("run")
      }}
      onFinish={async (values) => {

        if (facility === undefined){
          await createNewFacility(values,dataSource)
        } else {
          console.log("Try to update a facility")
          await updateFacility(values,dataSource,facility.docRef)
        }
        if(props.onFinish){
          props.onFinish()
        }
        return true;
      }}
      rules={[
        ({ getFieldValue }) => ({
          validator() {

            if(!facility.minimumTotalValue){
              return Promise.resolve();
            }
            
            if(facility.minimumTotalValue < getFieldValue('cardsNum') * getFieldValue('cardsPrice')){
              return Promise.reject(new Error('The total value you proposed must be bigger than the minimum value'));
            }
            return Promise.resolve();
          },
        }),
      ]}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="The name of the facility"
          placeholder="The name of the facility"
        />

        <ProFormText
          width="md"
          name="owner"
          label="Owner of the faility"
          placeholder="Facility owner"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker name="listingTime" label="Listing time" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="cardsNum"
          label="Number of cards"
          placeholder="Number of cards"
        />

        <ProFormText
          width="md"
          name="cardsPrice"
          label={`Price per card \n Minimum total value is ${facility === undefined? "0" : facility.minimumTotalValue}`}
          placeholder="Price of cards in USD"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="latitude"
          label="The latitude of the facility"
          placeholder="The latitude of the facility"
        />
        <ProFormText
          width="md"
          name="longitude"
          label="The longitude of the facility"
          placeholder="The longitude of the facility"
        />
      </ProForm.Group>
      <EditableProTable<DataSourceType>
        columns={columns}
        headerTitle=""
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
      
    </ModalForm>
  );
};

export default NewFacilityForm;