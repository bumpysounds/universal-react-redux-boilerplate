import express from 'express'

const api = express.Router();


api.get('/todos', (req, res) => {
  res.json({data:[{id:10,text:'a',completed:false},{id:11,text:'b',completed:true}]})
  // res.status(404).json({error:{code:404}})
})



export default api
 

// use the following JSON API responses (Google JSON GUIDE):
// SUCCESS
// {
//   "data": {
//     "id": 1001,
//     "name": "Wing"
//   }
// }
// ERROR
// {
//   "error": {
//     "code": 404,
//     "message": "ID not found"
//   }
// }
