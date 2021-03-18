import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2021 CENTER FOR SMART INFRASTRUCTURE FINANCE "
    links={[
      {
        key: 'Center For Smart Infrastructure Finance',
        title: 'Center For Smart Infrastructure Finance',
        href: 'https://sifin.engin.umich.edu/',
        blankTarget: true,
      },
     
    ]}
  />
);
