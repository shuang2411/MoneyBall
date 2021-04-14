import React, { useState } from "react";
import { Button, message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect
} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import {createNewFacility} from "@/services/ant-design-pro/api"
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};



type DataSourceType = {
  id: React.Key;
  info?: string;
  category?: string;
  
};

const defaultData: DataSourceType[] = [
 
  
];

const NewFacilityForm = () => {
  
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData
  );
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
      modalProps={{
        onCancel: () => console.log("run")
      }}
      onFinish={async (values) => {
        await createNewFacility(values,dataSource)
        return true;
      }}
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
          label="Price per card"
          placeholder="Price of cards in USD"
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
        // toolBarRender={() => {
        //   return [
        //     <Button
        //       type="primary"
        //       key="save"
        //       onClick={() => {
        //         // dataSource 就是当前数据，可以调用 api 将其保存
        //         console.log(dataSource);
        //       }}
        //     >
        //       保存数据
        //     </Button>,
        //   ];
        // }}
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