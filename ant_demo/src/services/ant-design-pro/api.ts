// @ts-ignore
/* eslint-disable */
import { ApiFilled } from '@ant-design/icons';
import { values } from 'lodash';
import { request } from 'umi';
import { db } from "./firebase";
import { auth } from "./firebase";

/** 获取当前的用户 GET /api/currentUser */
export function currentUser() {
  return  auth.currentUser as API.CurrentUser
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getAllFacility(): Promise<API.NewFacility[]> {

  const facilities:  API.NewFacility[] = [];


  const querySnapshot = await db.collection("cards").get()
  
  if(querySnapshot.empty){
    console.log("No document");
  }

  for (const doc of querySnapshot.docs){
     

      const facility : API.NewFacility = {
        name: doc.data().CardID,
        owner: doc.data().OwnerId,
        listingTime: doc.data().ListingTime,
        cardsNum: doc.data().Count,
        cardsPrice: doc.data().CardsPrice,
        isClaimed: doc.data().IsClaimed,
        minimumTotalValue: doc.data().MinimumTotalValue,
        latitude:  doc.data().Latitude,
        longitude: doc.data().Longitude,
        level: doc.data().Level,
        mediaID: doc.data().MediaID,
        docRef: doc.id,
        detail: doc.data().DetialedData,
      }

      console.log("Cards: ", doc.data());
      console.log("detail: ", facility.detail);

      facilities.push(facility);
     
  }
    
    return facilities;
        
}

export async function createNewFacility(newFacility: API.NewFacility, detailedData?: any){

  var newCard =  {
    CardID: newFacility.name,
    OwnerId: newFacility.owner,
    ListingTime: newFacility.listingTime,
    Count: newFacility.cardsNum,
    CardsPrice: newFacility.cardsPrice,
    IsClaimed: true,
    MinimumTotalValue:0,
    Latitude:  newFacility.latitude,
    Longitude: newFacility.longitude,
    Level: 1,
    MediaID: 1
  }

  newCard["DetialedData"] = detailedData

  // console.log(detailedData)
  // detailedData.map((value: any) => {
  //   newCard[value.category] = value.info
  //   }
  // )
  // console.log(newCard)

  db.collection("cards").add(
    newCard
).then(() =>  {
    //console.log("Document added with ID ", CardID);
})
}

export async function updateFacility(newValue, detailedData?:any, docRef){

  var newCard =  {
    CardID: newValue.name,
    OwnerId: newValue.owner,
    ListingTime: newValue.listingTime,
    Count: newValue.cardsNum,
    CardsPrice: newValue.cardsPrice,
    IsClaimed: true,
    MinimumTotalValue:0,
    Latitude:  newValue.latitude,
    Longitude: newValue.longitude,
    Level: 1,
    MediaID: 1
  }

  newCard["DetialedData"] = detailedData

  // console.log(detailedData)
  // detailedData.map((value: any) => {
  //   newCard[value.category] = value.info
  //   }
  // )
  console.log("the doc ref is",docRef)

  db.collection("cards").doc(docRef).update(
    newCard
).then(() =>  {
    //console.log("Document added with ID ", CardID);
})
}


export async function buyCard(cardDocRefID) {
  // TODO:: redo the entire buycard method, use collecton inventory instead of user_cards

  // console.log(cardDocRefID)

  // const userDocRefID = 'w4y9aZQMTcYX02RlRZODAtsTI0F3';
  // const card_doc_id = db.collection('cards')
  //      .doc(cardDocRefID);
  // // // Retreiving user's inventory
  // // const user_id = (await userDocRef.get()).data().UserID;
  // let CardOriginalCount = -1;
  // // console.log("cardID",cardDocRefID);
  // await db.collection('cards').doc(cardDocRefID).get().then(
  //     res => {
  //         // console.log("FIX",res.data());
  //         CardOriginalCount = res.data().Count;
  //     }
  // )
  

  // await db.collection('users_cards')
  //     .where('CardID', '==', card_doc_id).where('UserID', '==', userDocRefID)
  //     .get()
  //     .then(async(querySnapshot) => {
  //         // If user has not buy the card before add new doc to users_cards
  //         console.log("Find user")
  //         if (querySnapshot.empty) {
  //             await db.collection('users_cards').add({
  //                 CardID: card_doc_id,
  //                 Count: 1,
  //                 UserID: userDocRefID,
  //             })
  //             .catch(function(error) {
  //                 console.error("Error adding document: ", error);
  //             });
  //             // Update card collection
  //             await db.collection('cards').doc(cardDocRefID).update({'Count': CardOriginalCount - 1});
  //         }
  //         // Increase the count in users_cards
  //         else {
  //             const oldCount = querySnapshot.docs[0].data()['Count'];
  //             // The query result should only return 1 result
  //             await db.collection('users_cards').doc(querySnapshot.docs[0].id).update({'Count': oldCount + 1});
  //             await db.collection('cards').doc(cardDocRefID).update({'Count': CardOriginalCount - 1});
  //         }
  //     })
}