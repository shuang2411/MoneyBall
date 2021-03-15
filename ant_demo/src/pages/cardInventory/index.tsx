import ProTable from '@ant-design/pro-table';
import { db } from "@/services/ant-design-pro/firebase";
import NewFacilityForm from "@/components/NewFacilityForm"

type Card = {
    key: number
    card_id: string;
    media_id: string;
    level: number
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
                    });
                    counter++;
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };


    return(
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
    )
};

export default CardInventory