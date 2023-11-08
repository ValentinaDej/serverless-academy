import LinkSevice from "../services/linkSevice.js";

export const addShortLink = async (req, res, next) => {
  try {
    const link = req.body.link;
    const data = await LinkSevice.addLink(link);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new link" });
  }
};

export const followShortLink = async (req, res, next) => {
  try {
    const short = req.params.path;
    const link = await LinkSevice.getLink(short);
    return res.status(200).json({ link });
  } catch (error) {
    res.status(500).json({ error: "Failed to find the link" });
  }
};
