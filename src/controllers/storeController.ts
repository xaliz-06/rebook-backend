import Store from "../models/store";
import { Request, Response } from "express";

const searchStore = async (req: Request, res: Response) => {
  try {
    const city = req.params.city as string;

    const searchQuery = (req.query.searchQuery as string) || "";
    const genre = (req.query.genre as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Store.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (genre) {
      const genreArray = genre
        .split(",")
        .map((genre) => new RegExp(genre, "i"));

      query["interestedGenres"] = { $all: genreArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { sellerName: searchRegex },
        { interestedGenres: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const stores = await Store.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Store.countDocuments(query);
    const response = {
      data: stores,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching stores" });
  }
};

export default {
  searchStore,
};
