import React, { useState } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import { EditableProTable } from "@ant-design/pro-table";
import { Button } from "antd";

export type EditableFormProps = {
  submitFunction: (dataSource : any) => void;
};

type DataSourceType = {
  id: React.Key;
  info?: string;
  category?: string;
  
};

const defaultData: DataSourceType[] = [
 
  
];

const EditableInfoForm: React.FC = (props) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData
  );
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Category",
      dataIndex: "category",
      width: "30%"
    },
    {
      title: "Information",
      dataIndex: "info"
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
        delete
      </a>
      ]
    }
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        columns={columns}
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);
              }}
            >
              保存数据
            </Button>,
          ];
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
    </>
  );
};

export default EditableInfoForm;
