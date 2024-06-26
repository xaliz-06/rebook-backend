import mongoose, { InferSchemaType } from "mongoose";

const bookSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  author: { type: String, required: true },
  genre: [{ type: String, required: true }],
  releaseYear: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: String, required: true },
});

export type BookItemType = InferSchemaType<typeof bookSchema>;

const storeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sellerName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: String, required: true },
  interestedGenres: [{ type: String, required: true }],
  availableBooks: [bookSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

// const Book = mongoose.model("Book", bookSchema)
const Store = mongoose.model("Store", storeSchema);
export default Store;
