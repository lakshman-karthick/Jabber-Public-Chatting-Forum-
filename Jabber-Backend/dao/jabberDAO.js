import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let jabber

export default class jabberDAO{
    static async injectDB(conn)
    {
        if(jabber)
        {
            return
        }
        try{
            jabber = await conn.db("Jabber").collection("Chats")
            console.log(jabber)
        }catch(e)
        {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addchatDAO(roomName,creatorName,creatorEmail,profileImage,theme,timestamp)
    {
        try{
            const jabberDoc = {
                roomName :roomName,
                creatorName : creatorName,
                creatorEmail : creatorEmail,
                profileImage : profileImage,
                theme : theme,
                timestamp : timestamp
            }
            console.log("Adding")
            const addChatt = await jabber.insertOne(jabberDoc)
            console.log("hi");
            console.log(addChatt);
            return addChatt
        }catch(e)
        {
            console.error(`Unable to post activity: ${e}`);
            return {error:e}
        }
    }

    static async getchatDAO()
    {
        try{
         const getJabber = await jabber.find({}).toArray()
         console.log(getJabber);
         return getJabber
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async getIdchatDAO(id)
    {
        try{
         const getJabber = await jabber.find({_id:new ObjectId(id)}).toArray()
         console.log(getJabber);
         return getJabber
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async updateChatDAO(id,roomName,creatorName,creatorEmail,profileImage,theme,timestamp)
    {
        try{
            const updateJabber =await jabber.updateOne(
                {_id: new ObjectId(id)},
                {$set : {
                    roomName :roomName,
                    creatorName : creatorName,
                    creatorEmail : creatorEmail,
                    profileImage : profileImage,
                    theme : theme,
                    timestamp : timestamp
                }}
            )
            console.log(updateJabber);
            return updateJabber
        }catch(e)
        {
            console.error(`Unable to Update Activities: ${e}`)
            return {error:e}
        }
    }

    static async deleteChatDAO(id)
    {
        try{
            const deleteJabber = await jabber.deleteOne({
                _id: new ObjectId(id),
            })
            return deleteJabber
        }catch(e)
        {
            console.error(`Unable to Delete Activities: ${e}`)
            return {error:e}
        }
    }
}