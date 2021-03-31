import ProTable from '@ant-design/pro-table';
import { db } from "@/services/ant-design-pro/firebase"
import { message } from 'antd'
import { useModel } from 'umi';
import firebase from 'firebase/app';

type InventoryItem = {
    key : number;
    card_name: string;
    card_price: string;
    card_id: string;
    count: number;
};

const Inventory = () => {
    
    const {initialState, setInitialState} = useModel('@@initialState');
        //const uid = "dV3xIH6dy51aJBrDxmLD";
    const uid = initialState?.currentUser?.uid;
    let inventory_uid = "";
    
    async function getData(){
        //const uid = "dV3xIH6dy51aJBrDxmLD";
        let email = "";

        await db.collection("users")
            .doc(uid)
            .get()
            .then(querySnapshot => {
                if(querySnapshot.empty){
                    console.log("Cannot find user in databse.");
                    return;
                }
                
                inventory_uid = querySnapshot.data().Inventory_ID;
                email = querySnapshot.data().email;
            })
            .catch((error) => {
                console.log("Error getting documents from users: ", error);
            });;
        

        await db.collection("inventories")
            .doc(inventory_uid)
            .get()
            .then( async (querySnapshot) => {
                if(querySnapshot.empty){
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
            })
            .catch((error) => {
                console.log("Error getting documents from inventories: ", error);
            });
    };

    async function sellCard(card_uid){

        let success = false;
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
                        if(oldCount > 1){
                            await db.collection('inventories')
                            .doc(inventory_uid)
                            .update({
                                cards: firebase.firestore.FieldValue.arrayUnion({"card_id":card_uid,"count":oldCount-1})
                            });
                        }
                        message.success("Trade succuss");
                        success = true;
                        break;
                    }
                }
            })
            .catch((error) => {
                console.log("Error getting documents from inventories: ", error);
            });
        if(!success){
            message.error("Trade fails (not enough card)");
        }
    };

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
                <a 
                    onClick={async () => {
                        await sellCard(record.card_id);
                    }}
                    key="sell">
                    Sell
                </a>,
              ],
        },
    ];
    
    const tableListDataSource: InventoryItem[] = [];



    return(
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
    )
};

export default Inventory
