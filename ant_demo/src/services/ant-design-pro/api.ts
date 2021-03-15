// @ts-ignore
/* eslint-disable */
import { values } from 'lodash';
import { request } from 'umi';
import { db } from "./firebase";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createNewFacility(newFacility: API.NewFacility, detailedData?: any){

  var newCard =  {
    CardID: newFacility.name,
    OwnerId: newFacility.owner,
    ListingTime: newFacility.listingTime,
    CardsNum: newFacility.cardsNum,
    CardsPrice: newFacility.cardsPrice,
    Level: 1,
    MediaID: 1
  }

  console.log(detailedData)
  detailedData.map((value: any) => {
    newCard[value.category] = value.info
    }
  )
  console.log(newCard)

  db.collection("cards").add(
    newCard
).then(() =>  {
    //console.log("Document added with ID ", CardID);
})
}