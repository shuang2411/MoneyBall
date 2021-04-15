import ProTable from '@ant-design/pro-table';
import { db } from "@/services/ant-design-pro/firebase"
import { Button, message } from 'antd';
import ProForm, {
    ModalForm,
    ProFormText,
  } from '@ant-design/pro-form';
  import React, { useState } from 'react';


type InventoryItem = {
    key : number;
    user_id: string;
    user_email: string;
    card_name: string;
    card_price: string;
    relation_id: string;
    count: number;
};

const Inventory = () => {
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [card_uid, handleCardUid] = useState<string>("");

    async function getData(){

        await db.collection("users_cards")
            .get()
            .then( async (querySnapshot) => {
                if(querySnapshot.empty){
                    console.log("No document");
                }
                
                let counter = 0;
                
                for (const doc of querySnapshot.docs){

                    let email = "";
                    let userId = "";
                    await doc.data()['UserID'].get().then(res => { 
                        email = res.data().email;
                        userId = res.id;
                    })

                    let cardName = "";
                    let cardPrice = "";
                    await doc.data()['CardID'].get().then(res => { 
                        cardName = res.data().CardID;
                        cardPrice = res.data().CardPrice;
                    })

                    tableListDataSource.push({
                        key : counter,
                        user_id: userId,
                        user_email: email,
                        card_name: cardName,
                        card_price: cardPrice,
                        count: doc.data()['Count'],
                        relation_id: doc.id,
                    });
                    counter++;
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    async function sellCard(relation_id){

        await db.collection('users_cards')
            .doc(relation_id)
            .get()
            .then(async(querySnapshot) => {
                if(querySnapshot.empty){
                    console.log("No document");
                    message.error("Trade fails (not enough card)")
                    return;
                }
                const oldCount = querySnapshot.data()["Count"];
                if(oldCount == 1){
                    await db.collection('users_cards')
                        .doc(relation_id)
                        .delete()
                }else{
                    await db.collection("users_cards").doc(relation_id).update({"Count":oldCount-1});
                }
                message.success("Trade succuss")
            });
    }

    const columns = [
        {
          title: 'User',
          dataIndex: 'user_email',
          key: 'user_email',
        },
        {
          title: 'Card',
          dataIndex: 'card_name',
          key: 'card_name',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Price',
            dataIndex: 'card_price',
            key: 'card_price',
        },
        {
            title: 'Option',
            dataIndex: 'option',
            key: 'option',
            render: (_, record) => [
                <Button type="primary"
                    onClick = {async () => {
                        console.log(record);
                        handleModalVisible(true);
                        handleCardUid(record.card_doc_ref);
                        // await test(record.card_doc_ref, sellAmount, sellPrice);
                        // await sellCard(record.card_doc_ref, sellAmount, sellPrice);
                }}
                key='sell'>
                Sell
                </Button>,
              ],
        },
    ];
    
    const tableListDataSource: InventoryItem[] = [];

        
    async function sellCard(card_uid, sellAmount, sellPrice) {
        await db.collection('cards')
            .doc(card_uid)
            .get()
            .then(async(querySnapshot) => {
                if(querySnapshot.empty){
                    console.log("Cannot find the card in user inventory");
                    return;
                }
                const oldCount = querySnapshot.data().Count;
                await db.collection('cards').doc(card_uid).update({'Count': Number(oldCount) + Number(sellAmount)});
                console.log(sellPrice);
            });
    }


    return(
        
        <div className = "cards">
        <ProTable<InventoryItem>
            columns = {columns}
            request = { async (params = {}) => {
                    await getData();
                    return Promise.resolve({
                        data: tableListDataSource,
                        success: true,
                    });
                }
            }
            search={false}
        ></ProTable>
        <ModalForm<{
            amount: number;
            price: number;
        }>
        title="Sell cards"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        modalProps={{
            onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
            await sellCard(card_uid, Number(values.amount), Number(values.price));
            console.log(card_uid);
            message.success('Order submitted');
            location = location;
            return true;
        }}
        >
        <ProForm.Group>
            <ProFormText
            rules={[
                {
                required: true,
                // type: 'integer',
                },
            ]}
            width="md"
            name="amount"
            label="Amount to sell"
            tooltip="Enter the number of cards to sell"
            placeholder="e.g.123"
            />

        <ProFormText
            rules={[
                {
                required: true,
                // type: 'integer',
                },
            ]}
            width="md"
            name="price"
            label="Price to sell per card (Unit: USD)"
            tooltip="Enter the price"
            placeholder="e.g.123"
            /> 
        </ProForm.Group>
    </ModalForm>
        </div>
        
        
    )
};

export default Inventory
