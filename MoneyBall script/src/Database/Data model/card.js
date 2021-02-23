import { db } from "../firebase"

class Card {
    constructor (_cardID, _level, _mediaID ) {
        this.CardID = _cardID;
        this.Level = _level;
        this.MediaID = _mediaID;
    }
    toString() {
        return this._cardID + ', ' + this._level + ', ' + this._mediaID;
    }
}

// Firestore data converter
var cardConverter = {
    toFirestore: function(card) {
        return {
            CardID: card.CardID,
            Level: card.Level,
            MediaID: card.MediaID
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Card(data.CardID, data.Level, data.MediaID);
    }
};

export const CreateNewCard = async (_cardID, _level, _mediaID) => {
    db.collection("card").add(
        {
            CardID: _cardID,
            Level: _level,
            MediaID: _mediaID
        }
    ).then(() =>  {
        console.log("Document added with ID ", _cardID);
    })
}

export const getCard = async (_cardID) => {
    // Get card by CardID for now
    db.collection("card").where("CardID", "==", _cardID)
    .withConverter(cardConverter).get().then(function(doc) {
        if (doc.exists) {
            const card = doc.data();
            console.log(card.toString);
        } else {
            console.log("No such document.");
        }}).catch(function(error) {
            console.log("Error getting document:", error);
        });
}