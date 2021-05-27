import ProTable from '@ant-design/pro-table';
import { db } from "@/services/ant-design-pro/firebase"
<<<<<<< HEAD
import { Button, message } from 'antd';
import ProForm, {
    ModalForm,
    ProFormText,
  } from '@ant-design/pro-form';
  import React, { useState } from 'react';
=======
import { message,Button } from 'antd'
import { useModel } from 'umi';
import React, { useState } from 'react';
import ProForm, {ModalForm,ProFormText} from '@ant-design/pro-form';
import firebase from 'firebase/app';
>>>>>>> jeff

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

type InventoryItem = {
    key : number;
    card_name: string;
    card_price: string;
    card_id: string;
    count: number;
};

const Inventory = () => {
<<<<<<< HEAD
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [card_uid, handleCardUid] = useState<string>("");
=======
    
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [card_uid, handleCardUid] = useState<string>("");
    const [inventory_uid, handleInventoryId] = useState<string>("");
    const {initialState, setInitialState} = useModel('@@initialState');
    const uid = initialState?.currentUser?.uid;
>>>>>>> jeff

    async function getData(){
        let email = "";
        let inventory_id = "";
        await db.collection("users")
            .doc(uid)
            .get()
            .then(querySnapshot => {
                if(querySnapshot.data().empty){
                    console.log("Cannot find user in databse.");
                    return;
                }

                inventory_id = querySnapshot.data().Inventory_ID;
                handleInventoryId(inventory_id);
                email = querySnapshot.data().email;
            })
            .catch((error) => {
                console.log("Error getting documents from users: ", error);
            });
        
        await db.collection("inventories")
            .doc(inventory_id)
            .get()
            .then( async (querySnapshot) => {
                if(querySnapshot.data().empty){
                    console.log("Cannot find user's inventory in database.");
                    return;
                }
                const card_array = querySnapshot.data().cards;    
                let counter = 0;

                for (const doc of card_array){

                    const card_uid = doc['card_id'];
                    const card_count = doc['count']
                    let cardName = "";
                    let cardPrice = "";

                    await db.collection("cards")
                        .doc(card_uid)
                        .get()
                        .then((qs) => {
                            if(qs.empty){
                                console.log("Cannot find card information");
                                return;
                            }
                            cardName = qs.data().CardID;
                            cardPrice = qs.data().CardsPrice;
                        }).catch((error) => {
                            console.log("Error getting documents from cards: ", error);
                        });
                    
                    tableListDataSource.push({
                        key : counter,
                        card_name: cardName,
                        card_price: cardPrice,
                        count: card_count,
                        card_id: card_uid,
                    });
                    counter++;
                }
            }).catch((error) => {
                console.log("Error getting documents from inventories: ", error);
            });
    };
        

    async function sellCard(inventory_uid,card_uid,amount,price){

        let success = false;

        console.log("arr",inventory_uid);
        
        await db.collection('inventories')
        .doc(inventory_uid)
        .get()
        .then(async(querySnapshot) => {
                if(querySnapshot.empty){
                    console.log("Cannot find the card in user inventory");
                    return;
                }
                const card_array = querySnapshot.data().cards;
                for (const doc of card_array){
                    if(doc['card_id'] == card_uid){
                        const oldCount = doc['count'];
                        await db.collection('inventories')
                                .doc(inventory_uid)
                                .update({
                                    cards: firebase.firestore.FieldValue.arrayRemove({"card_id":card_uid,"count":oldCount})
                                });
                        if(oldCount > amount){
                            await db.collection('inventories')
                            .doc(inventory_uid)
                            .update({
                                cards: firebase.firestore.FieldValue.arrayUnion({"card_id":card_uid,"count":oldCount-amount})
                            });
                            message.success("Trade succuss");
                            success = true;
                        }else if(oldCount == amount){
                            message.success("Trade succuss");
                            success = true;
                        }
                        break;
                    }
                }
            }).catch((error) => {
                console.log("Error getting documents from inventories: ", error);
            });
        
        if(!success){
            message.error("Trade fails.");
        }
    }

    const columns = [
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
<<<<<<< HEAD
                        handleCardUid(record.card_doc_ref);
                        // await test(record.card_doc_ref, sellAmount, sellPrice);
                        // await sellCard(record.card_doc_ref, sellAmount, sellPrice);
                }}
                key='sell'>
                Sell
=======
                        handleCardUid(record.card_id);
                    }}
                key='sell'>
                    Sell
>>>>>>> jeff
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
<<<<<<< HEAD
        
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
        
        
=======
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
                await waitTime(1000);
                await sellCard(inventory_uid,card_uid, Number(values.amount), Number(values.price));
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
>>>>>>> jeff
    )
};

export default Inventory
