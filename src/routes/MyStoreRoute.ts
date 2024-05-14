import express from "express";
import multer from "multer";
import myStoreController from "../controllers/myStoreController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyStoreRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/order", jwtCheck, jwtParse, myStoreController.getMyStoreOrders);

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  myStoreController.updateMyOrderStatus
);

router.get("/", jwtCheck, jwtParse, myStoreController.getMyStore);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyStoreRequest,
  jwtCheck,
  jwtParse,
  myStoreController.createMyStore
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyStoreRequest,
  jwtCheck,
  jwtParse,
  myStoreController.updateMyStore
);

export default router;
