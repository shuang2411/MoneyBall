import { db } from "../firebase"

export const AddCard = async (_userID,_cardID,_count) => {
    const res = db.collection("users_cards").where("UserID", "==", _userID).where("CardID","==",_cardID).get();
    if(res.empty){
        db.collection("users_cards").add(
            {
                UserID : _userID,
                CardID : _cardID,
                Count : _count
            }
        );
    }else{
        res.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            const oldCount = doc.data["Count"];
            db.collection("users_cards").doc(doc.id).update({Count : oldCount + _count});
        });
    }
}

export const RemoveCard = async (_userID,_cardID,_count) => {
    const res = db.collection("users_cards").where("UserID", "==", _userID).where("CardID","==",_cardID).get();
    if(res.empty){
        
    }else{
        res.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            const oldCount = doc.data["Count"];
            db.collection("users_cards").doc(doc.id).update({Count : Math.max(0, oldCount - _count)});
        });
    }
}