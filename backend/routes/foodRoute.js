import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"


const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cd)=>{
        return cd(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);


export default foodRouter;


// import express from "express";
// import multer from "multer";
// import { addFood } from "../controllers/foodController.js";

// const router = express.Router();

// // multer setup
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     return cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // 🔥 YAHAN ADD KARNA HAI
// router.post("/add", upload.single("image"), addFood);

// export default router;