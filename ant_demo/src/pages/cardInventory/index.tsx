import ProTable from '@ant-design/pro-table';
import NewFacilityForm from "@/components/NewFacilityForm"
import { Button, message } from 'antd';
import { db } from "@/services/ant-design-pro/firebase";
import React, { useState } from 'react';
import ProForm, {
    ModalForm,
    ProFormText,
  } from '@ant-design/pro-form';
import {buyCard} from "@/services/ant-design-pro/api"

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

type Card = {
    key: number;
    card_id: string;
    media_id: string;
    level: number
    card_price: string;
    listed_time: string;
    count: number;
    card_doc_ref: string;
} 

const CardInventory = () => {
    const columns = [
        {
            title: 'Card ID',
            dataIndex: 'card_id',
            key: 'card_id',
        },
        {
            title: 'Media ID',
            dataIndex: 'media_id',
            key: 'media_id',
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Card Price',
            dataIndex: 'card_price',
            key: 'card_price',
        },
        {
            title: 'Listed Time',
            dataIndex: 'listed_time',
            key: 'listed_time',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Option',
            dataIndex: 'option',
            key: 'option',
            render: (_, record) => [
                <Button 
                    onClick = {async () => {
                        console.log(record);
                        await buyCard(record.card_doc_ref);
                        await waitTime(1000);
                        message.success("Order submitted");
                        //location = location;
                    }}
                    key='buy'>
                    Buy
                </Button>
            ],
        }

    ];

    const cards: Card[] = [];

    async function getData() {
        await db.collection("cards")
            .get()
            .then( async (querySnapshot) => {
                if(querySnapshot.empty){
                    console.log("No document");
                }
                let counter = 0;
                for (const doc of querySnapshot.docs){
                    console.log("Cards: ", doc.data());
                    cards.push({
                        key: counter,
                        card_id: doc.data().CardID,
                        media_id: doc.data().MediaID,
                        level: doc.data().Level,
                        card_price: doc.data().CardsPrice,
                        listed_time: doc.data().ListingTime,
                        count: doc.data().Count,
                        card_doc_ref: doc.id
                    });
                    counter++;
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    // async function buyCard(cardDocRefID) {
    //     // FIXME: This is hard coded right now
    //     // the input of doc should be the argument passed in the function
    //     // The following should be used to retrieve inventory ID
    //     const userDocRefID = 'w4y9aZQMTcYX02RlRZODAtsTI0F3';
    //     const card_doc_id = db.collection('cards')
    //          .doc(cardDocRefID);
    //     // // Retreiving user's inventory
    //     // const user_id = (await userDocRef.get()).data().UserID;
    //     let CardOriginalCount = -1;
    //     // console.log("cardID",cardDocRefID);
    //     await db.collection('cards').doc(cardDocRefID).get().then(
    //         res => {
    //             // console.log("FIX",res.data());
    //             CardOriginalCount = res.data().Count;
    //         }
    //     )
        

    //     await db.collection('users_cards')
    //         .where('CardID', '==', card_doc_id).where('UserID', '==', userDocRefID)
    //         .get()
    //         .then(async(querySnapshot) => {
    //             // If user has not buy the card before add new doc to users_cards
    //             if (querySnapshot.empty) {
    //                 await db.collection('users_cards').add({
    //                     CardID: card_doc_id,
    //                     Count: 1,
    //                     UserID: userDocRefID,
    //                 })
    //                 .catch(function(error) {
    //                     console.error("Error adding document: ", error);
    //                 });
    //                 // Update card collection
    //                 await db.collection('cards').doc(cardDocRefID).update({'Count': CardOriginalCount - 1});
    //             }
    //             // Increase the count in users_cards
    //             else {
    //                 const oldCount = querySnapshot.docs[0].data()['Count'];
    //                 // The query result should only return 1 result
    //                 await db.collection('users_cards').doc(querySnapshot.docs[0].id).update({'Count': oldCount + 1});
    //                 await db.collection('cards').doc(cardDocRefID).update({'Count': CardOriginalCount - 1});
    //             }
    //         })
    // }


    return(
        <div className = "cards">
        <NewFacilityForm />
        <ProTable<Card>
            columns = {columns}
            toolBarRender={() => [
                <NewFacilityForm/>
              ]}
            request = { async (params = {}) => {
                    await getData();
                    console.log("All Cards: ", cards)
                    return Promise.resolve({
                        data: cards,
                        success: true,
                    });
                }
            }
            search={false}
        ></ProTable>
        </div>
    )
};

export default CardInventory