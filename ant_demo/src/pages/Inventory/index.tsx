import ProTable from '@ant-design/pro-table';
import { db } from "@/services/ant-design-pro/firebase"

type InventoryItem = {
    key : number;
    user_id: string;
    card_id: string;
    count: number;
};

const Inventory = () => {
    const columns = [
        {
          title: 'User',
          dataIndex: 'user_id',
          key: 'user_id',
        },
        {
          title: 'Card',
          dataIndex: 'card_id',
          key: 'card_id',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
    ];
    
    const tableListDataSource: InventoryItem[] = [];

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
                    await doc.data()['UserID'].get().then(res => { 
                        email = res.data().email;
                    })

                    let cardID = "";
                    await doc.data()['CardID'].get().then(res => { 
                        cardID = res.data().CardID;
                    })

                    console.log("YY",email);
                    tableListDataSource.push({
                        key : counter,
                        user_id: email,
                        card_id: cardID,
                        count: doc.data()['Count'],
                    });
                    counter++;
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };


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
