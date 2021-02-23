import { db } from "../firebase"

export const createField = async(_cardID, _field, _fieldVal) => {
	db.collection("cards").where("CardID","==",_cardID).get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
            async db.collection("cards").doc(doc.id).set({_field: _fieldVal}, {merge: true});
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });

}

export const deleteField = async(_cardID, _field) => {
	db.collection("cards").where("CardID","==",_cardID).get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
            async db.collection("cards").doc(doc.id).update(
            	{_field: firebase.firestore._field.delete()}
            );
            console.log(doc.id, " => ", doc.data());
        });
    });
}

export const modifyField = async(_cardID, _field, _field) => {
	db.collection("cards").where("CardID","==",_cardID).get().then(function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
            async db.collection("cards").doc(doc.id).update({_field: _fieldVal});
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });

}