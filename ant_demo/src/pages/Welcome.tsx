import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import { db } from "@/services/ant-design-pro/firebase"

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
  const {initialState, setInitialState} = useModel('@@initialState');
  const [buyingPower, setBuyingpower] = useState(0);
  const uid = initialState?.currentUser?.uid;

  console.log(uid)
  useEffect( () => {
    async function fetchBuyingPower() {
      const user = await (await db.collection("users").doc(uid).get()).data()
      console.log("user",user)

      setBuyingpower(user.buyingPower)
    }
    fetchBuyingPower()
  },[]);
  
  return (
    <PageContainer>
      <Card>
        
        <Typography.Text strong>
          Your buying Power is: {buyingPower}
        </Typography.Text>

      </Card>
    </PageContainer>
  );
};
