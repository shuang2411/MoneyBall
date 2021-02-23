import { db } from "../firebase"

export const CreatNewUser = async (_email) => {
    db.collection("users").add(
        {
            email : _email,
        }
    )
}
