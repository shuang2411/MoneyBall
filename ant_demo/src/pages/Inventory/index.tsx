import ProTable from '@ant-design/pro-table';
import { db } from "@/services/ant-design-pro/firebase"
import { message } from 'antd'


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
                const oldCount = querySnapshot.data().["Count"];
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
                <a 
                    onClick={async () => {
                        console.log(record)
                        await sellCard(record.relation_id);
                        location = location                    }}
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
