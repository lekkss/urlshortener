import { config } from "dotenv";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";
import validateUrl from "../utils/utils.js";
config();
const shortUrl = async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

  const urlId = nanoid();
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json({ status: true, message: "Url already eists", data: url });
      } else {
        const shortUrl = `${base}/${urlId}`;
        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json({ status: true, message: "Url shortened", data: url });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: `Server Error ${error.message}` });
    }
  } else {
    res.status(400).json({ status: false, message: "invalid url" });
  }
};

const getUrl = async (req, res) => {
  try {
    const { urlId } = req.params;
    const url = await Url.findOne({ urlId: urlId });
    if (url) {
      await Url.updateOne(
        {
          urlId: urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json({ status: "faslse", message: "Url not found" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: `Server Error ${error.message}` });
  }
};

export { shortUrl, getUrl };
